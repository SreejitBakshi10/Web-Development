const select_from = document.getElementById('from');
const select_to = document.getElementById('to');
const input = document.getElementById('num');
const btn = document.getElementById('btn');
const clear = document.getElementById('clear');
const swap = document.getElementById('swap');
const output = document.getElementById('output');

function Button_OnOff()
{
  const from = select_from.value;
  const to = select_to.value;
  const num = input.value.trim();

  if(from !== '' && to !== '' && from !== to)
  {
    swap.disabled = false;
  }
  else
  {
    swap.disabled = true;
  }

  if(from !== '' && to !== '' && num !== '') 
  {
    if(from === to)
    {
      btn.disabled = true;
    }
    else
    {
      btn.disabled = false;
    }
    clear.disabled = false;
  } 
  else 
  {
    btn.disabled = true;
    if (from !== '' || to !== '' || num !== '')
    {
      clear.disabled = false;
    }
    else
    {
      clear.disabled = true;
    }
  }
}

select_from.addEventListener('change', Button_OnOff);
select_to.addEventListener('change', Button_OnOff);
input.addEventListener('input', Button_OnOff);

clear.addEventListener("click", function()
{
  select_from.value = "";
  select_to.value = "";
  input.value = "";
  output.value = "";
  Button_OnOff()
});

function convert() 
{
  const from = select_from.value;
  const to = select_to.value;
  const num = parseInt(input.value);
  
  if(from == "dec" && to == "bin")
  {
    output.value = num.toString(2);
  }
  else if(from == "dec" && to == "oct")
  {
    output.value = num.toString(8);
  }
  else if(from == "dec" && to == "hex")
  {
    output.value = num.toString(16).toLocaleUpperCase();
  }
  else if(from == "bin" && to == "dec")
  {
    output.value = parseInt(num, 2);
  }
  else if(from == "bin" && to == "oct")
  {
    output.value = parseInt(num, 2).toString(8);
  }
  else if(from == "bin" && to == "hex")
  {
    output.value = parseInt(num, 2).toString(16).toLocaleUpperCase();
  }
  else if(from == "oct" && to == "dec")
  {
    output.value = parseInt(num, 8);
  }
  else if(from == "oct" && to == "bin")
  {
    output.value = parseInt(num, 8).toString(2);
  }
  else if(from == "oct" && to == "hex")
  {
    output.value = parseInt(num, 8).toString(16).toLocaleUpperCase();
  }
  else if(from == "hex" && to == "dec")
  {
    output.value = parseInt(input.value, 16);
  }
  else if(from == "hex" && to == "bin")
  {
    output.value = parseInt(input.value, 16).toString(2);
  }
  else if(from == "hex" && to == "oct")
  {
    output.value = parseInt(input.value, 16).toString(8);
  }
}

btn.addEventListener('click', convert);

swap.addEventListener("click", function()
{
  var tmp = select_from.value;
  select_from.value = select_to.value;
  select_to.value = tmp;
  tmp = input.value
  input.value = output.value;
  output.value = tmp;
})