/* ============================================================
   TADFUQ AUTH — Shared JavaScript
   Used by: login.html + signup.html
   ============================================================ */

/*
// === Testimonials data (shared) ===
const TESTIMONIALS = [
  {
    quote: 'وفّرنا 40% من وقت فريق الدعم بفضل التوجيه الذكي. أصبحت كل محادثة تجد طريقها للمتخصص المناسب تلقائيًا.',
    name: 'م. سارة المطيري',
    role: 'مديرة تجربة العميل، شركة نمو',
    initial: 'س',
  },
  {
    quote: 'التحليلات اللحظية غيّرت طريقة اتخاذ قراراتنا. نرى أداء الفريق في الوقت الفعلي ونتدخل فورًا عند الحاجة.',
    name: 'أ. خالد الحربي',
    role: 'الرئيس التنفيذي، منصة سداد',
    initial: 'خ',
  },
  {
    quote: 'انتقلنا من 4 أنظمة منفصلة إلى تدفّق واحد. الكفاءة تضاعفت والعملاء يشعرون بالفرق.',
    name: 'م. نورة العتيبي',
    role: 'مديرة العمليات، متجر بيلا',
    initial: 'ن',
  },
];
*/

// === Email providers map ===
// const PROVIDER_LOGOS = {
//   'gmail.com': 'assets/images/provider-gmail.svg',
//   'googlemail.com': 'assets/images/provider-gmail.svg',
//   'outlook.com': 'assets/images/provider-outlook.svg',
//   'hotmail.com': 'assets/images/provider-outlook.svg',
//   'live.com': 'assets/images/provider-outlook.svg',
//   'yahoo.com': 'assets/images/provider-yahoo.svg',
//   'icloud.com': 'assets/images/provider-icloud.svg',
//   'me.com': 'assets/images/provider-icloud.svg',
// };

// === Utility ===
const $ = (id) => document.getElementById(id);

// === Toast notifications ===
function showToast(title, description, isError = false) {
  const toastContainer = $('toastContainer');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast-anim bg-tdq-card/95 backdrop-blur-md border rounded-xl p-3.5 px-5 text-tdq-white shadow-[0_10px_40px_rgba(0,0,0,0.4)] min-w-[280px] max-w-[400px] pointer-events-auto mb-2';
  toast.style.borderColor = isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(2, 199, 180, 0.3)';
  toast.innerHTML = `
    <div class="font-bold text-sm mb-1">${title}</div>
    <div class="text-xs text-tdq-secondary">${description}</div>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.4s forwards';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// === Init: 3D mockup parallax ===
function initMockupParallax() {
  const mockup3d = $('mockup3d');
  if (!mockup3d) return;
  mockup3d.addEventListener('mousemove', (e) => {
    const rect = mockup3d.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mockup3d.style.transform = `perspective(1200px) rotateY(${-4 + x * 8}deg) rotateX(${2 - y * 8}deg)`;
  });
  mockup3d.addEventListener('mouseleave', () => {
    mockup3d.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(2deg)';
  });
}

/*
// === Init: Rotating testimonials ===
function initTestimonials() {
  const quoteEl = $('testimonialQuote');
  const nameEl = $('testimonialName');
  const roleEl = $('testimonialRole');
  const initialEl = $('testimonialInitial');
  const dotsEl = $('testimonialDots');
  if (!quoteEl) return;

  let idx = 0;
  function render() {
    const t = TESTIMONIALS[idx];
    quoteEl.textContent = `"${t.quote}"`;
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    initialEl.textContent = t.initial;

    dotsEl.innerHTML = '';
    TESTIMONIALS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `h-1 rounded-full transition-all ${i === idx ? 'w-5 bg-tdq-primary' : 'w-1.5 bg-tdq-white/15'}`;
      dotsEl.appendChild(dot);
    });
  }
  render();
  setInterval(() => {
    idx = (idx + 1) % TESTIMONIALS.length;
    render();
  }, 5500);
}
*/

// === Init: Password visibility toggle ===
function initPasswordToggle(buttonId, inputId, iconId) {
  const btn = $(buttonId);
  const input = $(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    const icon = iconId ? $(iconId) : btn.querySelector('svg');
    if (icon) {
      icon.innerHTML = isHidden ?
        '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>' :
        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
  });
}

// === Init: Email provider detection ===
// function initEmailProvider(inputId, providerContainerId, providerImgId) {
//   const input = $(inputId);
//   const provider = $(providerContainerId);
//   const providerImg = $(providerImgId);
//   if (!input || !provider || !providerImg) return;
//   input.addEventListener('input', (e) => {
//     const email = e.target.value.trim();
//     if (!email.includes('@')) {
//       provider.style.opacity = '0';
//       return;
//     }
//     const domain = email.split('@')[1]?.toLowerCase();
//     if (!domain) {
//       provider.style.opacity = '0';
//       return;
//     }
//     const providerLogo = PROVIDER_LOGOS[domain] || 'assets/provider-default.svg';
//     providerImg.src = providerLogo;
//     provider.style.opacity = '0.85';
//   });
// }

// === Init: Other sector input ===
function initSectorOtherInput() {
  const select = document.querySelector('select[name="sector"]');
  const field = $('sectorOtherField');
  const input = $('sectorOtherInput');
  if (!select || !field || !input) return;

  function updateSectorOtherVisibility() {
    const show = select.value === 'other';
    field.classList.toggle('hidden', !show);
    input.disabled = !show;
    if (!show) input.value = '';
  }

  select.addEventListener('change', updateSectorOtherVisibility);
  input.addEventListener('input', () => clearErrors());
  updateSectorOtherVisibility();
}

// === Init: Password strength rules (signup only) ===
function initPasswordStrength(inputId, containerId) {
  const input = $(inputId);
  const container = $(containerId);
  if (!input || !container) return;
  input.addEventListener('input', (e) => {
    const pwd = e.target.value;
    if (!pwd) {
      container.classList.add('hidden');
      return;
    }
    container.classList.remove('hidden');

    const rules = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd) && /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      symbol: /[^A-Za-z0-9]/.test(pwd),
    };

    Object.keys(rules).forEach(ruleId => {
      const ruleEl = document.querySelector(`.pwd-rule[data-rule="${ruleId}"]`);
      if (ruleEl) {
        ruleEl.classList.toggle('done', rules[ruleId]);
        ruleEl.classList.toggle('text-tdq-primary-l', rules[ruleId]);
        const checkWrap = ruleEl.querySelector('.check-wrap');
        if (rules[ruleId]) {
          checkWrap.style.background = '#02C7B4';
          checkWrap.style.borderColor = '#02C7B4';
          checkWrap.querySelector('.check-svg').style.opacity = '1';
        } else {
          checkWrap.style.background = 'transparent';
          checkWrap.style.borderColor = 'rgba(241, 244, 245, 0.18)';
          checkWrap.querySelector('.check-svg').style.opacity = '0';
        }
      }
    });
  });
}

// === Validation helpers ===
function showError(field, message) {
  const errEl = document.querySelector(`.error-msg[data-field="${field}"]`);
  if (errEl) {
    errEl.textContent = message;
    errEl.classList.remove('hidden');
  }
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => {
    el.classList.add('hidden');
    el.textContent = '';
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[+]?[\d\s-]{8,}$/.test(phone);
}

// === Form submit handler ===
// mode: 'login' | 'signup'
function initFormSubmit(mode) {
  const authForm = $('authForm');
  const submitBtn = $('submitBtn');
  const submitText = $('submitText');
  const formCard = $('formCard');
  const successState = $('successState');
  if (!authForm) return;

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(authForm);
    const email = (formData.get('email') || '').trim();
    const password = formData.get('password') || '';
    let isValid = true;

    // Common validation
    if (!email) {
      showError('email', 'يرجى إدخال البريد الإلكتروني');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'البريد الإلكتروني غير صالح');
      isValid = false;
    }

    if (!password) {
      showError('password', 'يرجى إدخال كلمة المرور');
      isValid = false;
    } else if (mode === 'signup' && password.length < 8) {
      showError('password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      isValid = false;
    }

    // Signup-only validation
    if (mode === 'signup') {
      const name = (formData.get('name') || '').trim();
      const phone = (formData.get('phone') || '').trim();
      const sector = (formData.get('sector') || '').trim();
      const sectorOther = (formData.get('sectorOther') || '').trim();
      const confirmPassword = formData.get('confirmPassword') || '';
      const agreeTerms = $('agreeTerms').checked;

      if (!name) {
        showError('name', 'يرجى إدخال الاسم الكامل');
        isValid = false;
      } else if (name.length < 3) {
        showError('name', 'الاسم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
      }

      if (!phone) {
        showError('phone', 'يرجى إدخال رقم الجوال');
        isValid = false;
      } else if (!validatePhone(phone)) {
        showError('phone', 'رقم الجوال غير صالح');
        isValid = false;
      }

      if (sector === 'other' && !sectorOther) {
        showError('sectorOther', 'يرجى إدخال اسم القطاع');
        isValid = false;
      }

      if (!confirmPassword) {
        showError('confirmPassword', 'يرجى تأكيد كلمة المرور');
        isValid = false;
      } else if (password !== confirmPassword) {
        showError('confirmPassword', 'كلمتا المرور غير متطابقتين');
        isValid = false;
      }

      if (!agreeTerms) {
        showError('terms', 'يجب الموافقة على الشروط والأحكام للمتابعة');
        isValid = false;
      }
    }

    if (!isValid) {
      showToast('يرجى مراجعة الحقول', 'بعض الحقول تحتاج إلى تعديل قبل المتابعة.', true);
      formCard.classList.add('animate-shake');
      setTimeout(() => formCard.classList.remove('animate-shake'), 500);
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitText.innerHTML = '<svg class="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> جارٍ المعالجة...';

    await new Promise(r => setTimeout(r, 1600));

    submitBtn.disabled = false;

    // Success state
    $('successTitle').textContent = mode === 'login' ? 'تم تسجيل الدخول!' : 'تم إنشاء حسابك!';
    $('successMsg').textContent = mode === 'login' ?
      'جارٍ تحويلك إلى لوحة التحكم...' :
      'تحقق من بريدك الإلكتروني لتأكيد الحساب.';
    successState.classList.remove('hidden');

    // Hide form + OAuth + divider
    document.querySelectorAll('#authForm > *').forEach(el => el.style.display = 'none');
    const oauthSection = authForm.previousElementSibling;
    const divider = oauthSection?.previousElementSibling;
    if (oauthSection) oauthSection.style.display = 'none';
    if (divider) divider.style.display = 'none';

    showToast(
      mode === 'login' ? 'مرحبًا بعودتك إلى تدفّق' : 'تم إنشاء حسابك بنجاح',
      mode === 'login' ?
      'تم تسجيل دخولك بنجاح. جارٍ تحويلك إلى لوحة التحكم...' :
      'أهلاً بك في تدفّق! تحقق من بريدك لتأكيد الحساب.'
    );

    submitText.textContent = mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب';

    // Reset after 2.5s — redirect to other page
    setTimeout(() => {
      if (mode === 'login') {
        // Redirect to dashboard (or stay here)
        window.location.href = 'login.html';
      } else {
        // Redirect to login after successful signup
        window.location.href = 'login.html';
      }
    }, 2500);
  });
}

// === Page initialization dispatcher ===
// page: 'login' | 'signup'
function initPage(page) {
  document.addEventListener('DOMContentLoaded', () => {
    // Shared inits
    initMockupParallax();
    // initTestimonials();
    // initEmailProvider('emailInput', 'emailProvider', 'emailProviderImg');
    initPasswordToggle('togglePassword', 'passwordInput', 'eyeIcon');
    initFormSubmit(page);

    // Signup-specific
    if (page === 'signup') {
      initSectorOtherInput();
      initPasswordStrength('passwordInput', 'pwdStrength');
      initPasswordToggle('toggleConfirmPassword', 'confirmPasswordInput', null);
    }
  });
}