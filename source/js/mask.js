(function () {
  const maskedInput = document.querySelector('[data-mask]');

  function maskInput() {
    const mask = this.dataset.mask;
    let value = this.value;
    const literalPattern = /[0]/;
    const numberPattern = /[0-9]/;
    let newValue = '';

    let maskLength = mask.length;
    let valueIndex = 0;
    let maskIndex = 0;

    for (; maskIndex < maskLength;) {
      if (maskIndex >= value.length) break;

      if (mask[maskIndex] === '0' && value[valueIndex].match(numberPattern) === null) break;

      while (mask[maskIndex].match(literalPattern) === null) {
        if (value[valueIndex] === mask[maskIndex]) break;
        newValue += mask[maskIndex++];
      }
      newValue += value[valueIndex++];
      maskIndex++;
    }
    this.value = newValue;
  }

  maskedInput.addEventListener('input', maskInput);

})();
