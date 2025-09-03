/* -------------------------
   Utility: LocalStorage DB
--------------------------*/
const DB_KEYS = {
  USERS: 'auth_demo_users',
  OTP: 'auth_demo_otp',                 // { [email]: { code, exp } }
  RESET: 'auth_demo_reset_tokens',      // { [token]: email }
  SESSION: 'auth_demo_session'          // { email, name }
};

function load(key, fallback){
  try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch{ return fallback; }
}
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

function getUsers(){ return load(DB_KEYS.USERS, []); }
function setUsers(list){ save(DB_KEYS.USERS, list); }
function findUserByEmail(email){ return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); }
function findUserByPhone(phone){ return getUsers().find(u => (u.phone||'') === (phone||'')); }

/* -------------------------
   Toasts
--------------------------*/
function toast(msg, type='info', timeout=3000){
  const wrap = document.getElementById('toasts');
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.innerHTML = `<div style="font-size:18px">${type==='success'?'✅':type==='error'?'⛔':'🔔'}</div>
                    <div style="flex:1">${msg}</div>
                    <button aria-label="Close" style="background:transparent;border:none;color:#9fb3ff;cursor:pointer">✖</button>
                    <div class="bar"></div>`;
  const closeBtn = node.querySelector('button');
  closeBtn.onclick = ()=> wrap.removeChild(node);
  wrap.appendChild(node);
  setTimeout(()=>{ if (wrap.contains(node)) wrap.removeChild(node); }, timeout);
}

function copyToClipboard(text){
  try{
    navigator.clipboard?.writeText(text);
    toast('Copied to clipboard', 'info', 1800);
  }catch(e){}
}

/* -------------------------
   View switching
--------------------------*/
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

tabs.forEach(t=>{
  t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    showView(t.dataset.target);
  });
});
document.querySelectorAll('[data-goto]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = a.dataset.goto;
    tabs.forEach(x=>x.classList.toggle('active', x.dataset.target===target));
    showView(target);
  });
});
function showView(id){
  views.forEach(v=>v.classList.toggle('active', v.id===id));
  document.getElementById('dashboard')?.classList.remove('active');
  // Keep reset token if coming from reset link
}

/* -------------------------
   Password validation
--------------------------*/
function validPassword(pw){
  // At least 1 uppercase, 1 number, 1 special char; length >= 6
  const rules = [
    [/[A-Z]/, 'one uppercase letter'],
    [/[0-9]/, 'one number'],
    [/[^A-Za-z0-9]/, 'one special character'],
    [/.{6,}/, 'at least 6 characters']
  ];
  const missing = rules.filter(([re])=>!re.test(pw)).map(([,m])=>m);
  return { ok: missing.length===0, missing };
}

/* -------------------------
   Register
--------------------------*/
document.getElementById('registerBtn').addEventListener('click', ()=>{
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if(!name || !email || !phone || !password){ toast('Please fill all fields', 'error'); return; }

  if(findUserByEmail(email)){ toast('Email already registered', 'error'); return; }
  if(findUserByPhone(phone)){ toast('Phone already registered', 'error'); return; }

  const v = validPassword(password);
  if(!v.ok){ toast('Weak password – missing ' + v.missing.join(', '), 'error'); return; }

  const users = getUsers();
  users.push({ id: cryptoRandomId(), name, email, phone, password }); // NOTE: plain-text for demo only
  setUsers(users);

  toast('Registration successful! You can log in now.', 'success');
  clearReg();
  gotoTab('loginView');
});

function clearReg(){
  ['regName','regPhone','regEmail','regPassword'].forEach(id=>document.getElementById(id).value='');
}

/* -------------------------
   Login (email + password)
--------------------------*/
document.getElementById('loginBtn').addEventListener('click', ()=>{
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const u = findUserByEmail(email);
  if(!u){ toast('No account found for this email', 'error'); return; }
  if(u.password !== password){ toast('Invalid credentials', 'error'); return; }

  save(DB_KEYS.SESSION, { email: u.email, name: u.name });
  toast('Login successful – welcome!', 'success');
  openDashboard(u.name);
  window.location.href = 'Home.html';
  clearLogin();
});

function clearLogin(){
  ['loginEmail','loginPassword'].forEach(id=>document.getElementById(id).value='');
}

/* -------------------------
   Explore without login
--------------------------*/
document.getElementById('exploreBtn').addEventListener('click', ()=>{
  toast('Exploring as guest', 'info');
  openDashboard('Guest');
});

/* -------------------------
   OTP Login (simulate email)
--------------------------*/
document.getElementById('sendOtpBtn').addEventListener('click', ()=>{
  const email = document.getElementById('otpEmail').value.trim();
  const u = findUserByEmail(email);
  if(!u){ toast('No account found for this email', 'error'); return; }

  //-----------code ------------ 
  function generateCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
  const code = generateCode(8);
  const exp = Date.now() + 5*60*1000; // 5 minutes
  const store = load(DB_KEYS.OTP, {});
  store[email.toLowerCase()] = { code, exp };
  save(DB_KEYS.OTP, store);

  const linkText = `OTP for ${email}: ${code} (valid 5 min)`;
  toast(`Code : <strong>${code}</strong> <span class="link" style="margin-left:6px" onclick="copyToClipboard('${code}')">Copy</span>`, 'info', 6000);
});

document.getElementById('verifyOtpBtn').addEventListener('click', ()=>{
  const email = document.getElementById('otpEmail').value.trim().toLowerCase();
  const code = document.getElementById('otpCode').value.trim();
  const u = findUserByEmail(email);
  if(!u){ toast('No account found for this email', 'error'); return; }

  const store = load(DB_KEYS.OTP, {});
  const rec = store[email];
  if(!rec){ toast('No OTP requested. Please send OTP first.', 'error'); return; }
  if(Date.now() > rec.exp){ toast('OTP expired. Please request a new one.', 'error'); delete store[email]; save(DB_KEYS.OTP, store); return; }
  if(rec.code !== code){ toast('Invalid OTP', 'error'); return; }

  delete store[email]; save(DB_KEYS.OTP, store);
  save(DB_KEYS.SESSION, { email: u.email, name: u.name });
  toast('OTP verified – login successful', 'success');
  setTimeout(()=>{ window.location.href = "Home.html"; }, 1000);
});

/* -------------------------
   Forgot → Reset (simulate email link)
--------------------------*/
let pendingResetToken = null;

document.getElementById('sendResetBtn').addEventListener('click', ()=>{
  const email = document.getElementById('fpEmail').value.trim().toLowerCase();
  const u = findUserByEmail(email);
  if(!u){ toast('No account found for this email', 'error'); return; }

  const token = cryptoRandomId(24);
  const map = load(DB_KEYS.RESET, {});
  map[token] = email;
  save(DB_KEYS.RESET, map);

  const link = `${location.origin}${location.pathname}#reset=${token}`;
  toast(`Reset link (demo): <span class="link" onclick="copyToClipboard('${link}')">Copy Link</span> or <span class="link" onclick="openResetFromToken('${token}')">Open Now</span>`, 'info', 8000);
});

/* Reset page – open via token */
function openResetFromToken(token){
  const map = load(DB_KEYS.RESET, {});
  if(!map[token]){ toast('Invalid or expired reset link', 'error'); return; }
  pendingResetToken = token;
  gotoTab('resetView');
}

document.getElementById('applyResetBtn').addEventListener('click', ()=>{
  if(!pendingResetToken){
    toast('Missing reset token. Use the link from Forgot Password.', 'error');
    return;
  }
  const newPass = document.getElementById('newPass').value;
  const confirm = document.getElementById('confirmPass').value;
  if(newPass !== confirm){ toast('Passwords do not match', 'error'); return; }
  const v = validPassword(newPass);
  if(!v.ok){ toast('Weak password – missing ' + v.missing.join(', '), 'error'); return; }

  const map = load(DB_KEYS.RESET, {});
  const email = map[pendingResetToken];
  if(!email){ toast('Reset link expired', 'error'); return; }

  const users = getUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if(idx === -1){ toast('Account not found', 'error'); return; }

  users[idx].password = newPass;
  setUsers(users);
  delete map[pendingResetToken]; save(DB_KEYS.RESET, map);
  pendingResetToken = null;

  document.getElementById('newPass').value='';
  document.getElementById('confirmPass').value='';

  toast('Password updated successfully! Please login.', 'success');
  gotoTab('loginView');
});

/* -------------------------
   Dashboard & Session
--------------------------*/
function openDashboard(name){
  window.location.href = 'Home.html';
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  localStorage.removeItem(DB_KEYS.SESSION);
  toast('Logged out', 'info');
  gotoTab('loginView');
});

/* -------------------------
   Helpers
--------------------------*/
function gotoTab(viewId){
  tabs.forEach(x=>x.classList.toggle('active', x.dataset.target===viewId));
  showView(viewId);
}

function cryptoRandomId(len=16){
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  const r = crypto.getRandomValues(new Uint32Array(len));
  for(let i=0;i<len;i++){ out += alphabet[r[i] % alphabet.length]; }
  return out;
}

/* -------------------------
   Deep link: #reset=TOKEN
--------------------------*/
(function handleHash(){
  const h = location.hash || '';
  const m = h.match(/#reset=([A-Za-z0-9]+)/);
  if(m){
    openResetFromToken(m[1]);
    // do not clear hash so reload still works
  }
})();


