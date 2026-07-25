import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Contact() {
  const { t, lang, isAr } = useLanguage();
  const { data } = usePortfolio();
  const contact = data?.contact || {};
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const orig = btn.innerHTML;
    btn.textContent = isAr ? 'جاري الإرسال...' : 'Sending...';
    setStatus('sending');

    try {
    const response = await fetch('https://formspree.io/f/mnjebvzb', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        btn.textContent = isAr ? 'تم الإرسال ✓' : 'Sent Successfully ✓';
        btn.style.background = 'linear-gradient(135deg,#4c1d95,#7c3aed)';
        form.reset();
        setStatus('success');
      } else {
        btn.textContent = isAr ? 'حدث خطأ ✗' : 'Error ✗';
        btn.style.background = '#f43f5e';
        setStatus('error');
      }
    } catch {
      btn.textContent = isAr ? 'حدث خطأ ✗' : 'Error ✗';
      btn.style.background = '#f43f5e';
      setStatus('error');
    }

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      setStatus('idle');
    }, 3000);
  };

  const email = contact.email || 'hk4@example.com';
  const phone = contact.phone || '+963 xxx xxx';
  const location = contact[`loc_${lang}` as keyof typeof contact] || 'Latakia, Syria';
  const linkedin = contact.linkedin || 'https://www.linkedin.com/in/haitham-kallab-5aa943402';
  const coding = contact[`coding_${lang}` as keyof typeof contact] || 'React Native';

  return (
    <section
      className="contact"
      id="contact"
      style={{
        position: 'relative',
        backgroundImage:
          'linear-gradient(rgba(5, 5, 15, 0.82), rgba(5, 5, 15, 0.82)), url(https://res.cloudinary.com/e2kvlfyf/video/upload/so_2,q_100,w_2560/v1784386075/Mobail_jumfsg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <span className="sec-label reveal">Get In Touch</span>
      <h2
        className="heading reveal"
        dangerouslySetInnerHTML={{ __html: t('contact-heading') }}
      />
      <div className="contact-container reveal">
        <div className="contact-glass-card">
          <div className="info-tile">
            <div className="tile-icon"><i className="fa-solid fa-envelope" /></div>
            <div className="tile-body">
              <span className="tile-label">{t('lbl-contact-email-title')}</span>
              <p className="tile-value">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>
          </div>
          <div className="info-tile">
            <div className="tile-icon"><i className="fa-solid fa-phone" /></div>
            <div className="tile-body">
              <span className="tile-label">{t('lbl-contact-phone-title')}</span>
              <p className="tile-value">{phone}</p>
            </div>
          </div>
          <div className="info-tile">
            <div className="tile-icon"><i className="fa-solid fa-location-dot" /></div>
            <div className="tile-body">
              <span className="tile-label">{t('lbl-contact-loc-title')}</span>
              <p className="tile-value">{location}</p>
            </div>
          </div>
          <div className="info-tile">
            <div className="tile-icon"><i className="fa-brands fa-linkedin-in" /></div>
            <div className="tile-body">
              <span className="tile-label">{t('lbl-contact-linkedin-title')}</span>
              <p className="tile-value">
                <a href={linkedin} target="_blank" rel="noreferrer">
                  {isAr ? 'عرض الحساب الشخصي' : 'View Profile'}
                </a>
              </p>
            </div>
          </div>
          <div className="info-tile">
            <div className="tile-icon"><i className="fa-solid fa-code" /></div>
            <div className="tile-body">
              <span className="tile-label">{t('lbl-contact-coding-title')}</span>
              <p className="tile-value">{coding}</p>
            </div>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <form id="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="name" placeholder="Your Name" className="contact-single-input" required />
            <input type="email" name="email" placeholder="Your Email" className="contact-single-input" required />
            <input type="text" name="_subject" placeholder="Your Subject" className="contact-single-input" required />
            <textarea name="message" cols={30} rows={5} placeholder="Your Message" required />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
              Send Message &#x279C;
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}