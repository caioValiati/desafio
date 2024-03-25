export const CpfCnpjMask = (value: string, isPfPj: 'CPF' | 'CNPJ') => {
  if (!value) return ""
  let formattedValue = value;
  if (isPfPj === 'CPF') {
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    formattedValue = formattedValue.replace(/^(\d{2})(\d)/, "$1.$2");
    formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, ".$1/$2");
    formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2");
  }
  return formattedValue
};

export const CEPMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'');
  value = value.replace(/(\d{5})(\d)/,'$1-$2');
  return value;
}

export const IEMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
  return value;
}