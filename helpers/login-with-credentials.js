function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
}

function loginWithCredentials(email, password) {
  const emailInput = document.querySelector('[name="email"]');
  const passwordInput = document.querySelector('[name="password"]');
  const submitButton = document.querySelector('[name="button"]');

  if (emailInput && passwordInput && submitButton) {
    setNativeValue(emailInput, email);
    setNativeValue(passwordInput, password);
    submitButton.click();
  }
}

// loginWithCredentials("user@service.com", "password")
