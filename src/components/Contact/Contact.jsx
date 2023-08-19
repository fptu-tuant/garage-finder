import emailjs from '@emailjs/browser';
import { Button,Form,Input } from 'antd';
import React, { useRef } from 'react';
function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_tq1gfkm',
      'template_v8hxkmv',
      form.current,
      '7IE1jATfI-2lIgJoU'
    );
    e.target.reset();
    // form.current.resetFields()
  };

  return (
    <section className="text-center contact section  mt-[200px] " id="contact">
      <h2
        id="contact"
        className="section__title text-center text-3xl mb-[50px]"
      >
        Liên hệ
      </h2>
      <div className="contact__container container">
        <div className="contact__content">
          <h3 className="contact__title mb-10">
            Để lại lời nhắn cho chúng tôi
          </h3>
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <div className="contact__form-div">
              <input
                className="tl-input css-1wl8g3 max-w-[400px] mb-5"
                placeholder="Nhập tên của bạn"
                name="name"
              />
            </div>

            <div className="contact__form-div">
              <input
                type="email"
                className="tl-input css-1wl8g3 max-w-[400px] mb-5"
                placeholder="Nhập email của bạn"
                name="email"
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <input
                type="text"
                className="tl-input css-1wl8g3 max-w-[400px] h-[100px] mb-10"
                placeholder="Lời nhắn..."
                name="message"
              />
            </div>
            <button className="button bg-purple-600 border-none px-10 py-3 rounded-lg text-white cursor-pointer">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
