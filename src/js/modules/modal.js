function closeModal(modalSelector) {
  modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "";
}
function showModal(modalSelector) {
  modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function modal(triggerSelector, modalSelector, formSelector) {
  // Modal
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    forms = document.querySelectorAll(formSelector);
  const message = {
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => showModal(modalSelector));
  });

  // modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal(modalSelector);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  forms.forEach((item) => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");

      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);
      showThanksModal(message.success);
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.style.display = "none";
    showModal(".modal");

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.style.display = "block";
      closeModal(".modal");
    }, 4000);
  }
}

export default modal;
export { showModal };
export { closeModal };
