// Adicione essa parte ao seu código JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const dataInput = document.getElementById('data');
  

  const horarioCheckboxes = document.getElementById('horarioCheckboxes');

// Lista de horários predefinidos
const horarioPresets = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

// Adicione checkboxes para cada horário predefinido
horarioPresets.forEach((horario, index) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${index}`;
    checkbox.value = horario;

    const label = document.createElement('label');
    label.htmlFor = `checkbox-${index}`;
    label.appendChild(document.createTextNode(horario));

    // Adicione checkbox e rótulo ao elemento de checkboxes
    horarioCheckboxes.appendChild(checkbox);
    horarioCheckboxes.appendChild(label);
    horarioCheckboxes.appendChild(document.createElement('br')); // Adicione uma quebra de linha para separar os checkboxes
});

// Adicione um evento de clique para o botão de confirmação de horários
document.getElementById('confirmHorariosBtn').addEventListener('click', function () {
    // Obtenha os horários selecionados
    const selectedHorarios = Array.from(horarioCheckboxes.querySelectorAll('input:checked')).map(checkbox => checkbox.value);

    // Preencha o campo de horários no formulário principal
    document.getElementById('hora').value = selectedHorarios.join(', ');

    // Feche o modal
    $('#horarioModal').modal('hide');
});


  // Inicialize o flatpickr para permitir a seleção de vários dias
  const calendar = flatpickr(dataInput, {
      mode: 'multiple',
      dateFormat: 'd-m-Y',
      locale: 'pt',
      defaultDate: new Date(), // Pode ajustar a data inicial se desejar
  });

  document.getElementById('createServico').addEventListener('click', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const currentUser = Parse.User.current();

    if (!currentUser) {
      alert('Usuário não autenticado. Faça login antes de criar um serviço.');
      return;
    }

    const horaElement = document.getElementById('hora').value;
    console.log(horaElement)
    const nome = document.getElementById('nome').value;
    const observacoes = document.getElementById('anotacoes').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const selectedDays = calendar.selectedDates.map(date => date.toISOString().split('T')[0]);
    const selectedHours = horaElement.split(','); // Converta a string em um array de horas
    
    // Validar campos
    if (!nome || !observacoes || isNaN(preco) || selectedDays.length === 0 || selectedHours.length === 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Crie uma nova instância da classe Servico
    const Servico = new Parse.Object('Servico');
    Servico.set('nome', nome);
    Servico.set('observacoes', observacoes);
    Servico.set('preco', preco);
    Servico.set('user_id', currentUser);

    // Salve a instância da classe Servico no Back4App
    Servico.save().then(function (servico) {
      // Para cada dia e hora selecionados, crie uma instância da classe Horario e associe-a ao Servico
      const promises = [];

      for (const selectedDay of selectedDays) {
        for (const selectedHour of selectedHours) {
          const Horario = new Parse.Object('Horario');
          Horario.set('servico_id', servico);
          Horario.set('dentista_id', currentUser);
          Horario.set('dia', selectedDay);
          Horario.set('hora', selectedHour.trim()); // Remova espaços em branco extras

          // Adicione a promessa à lista de promessas
          promises.push(Horario.save());
        }
      }

      // Execute todas as promessas usando Promise.all
      return Promise.all(promises);
    }).then(function () {
      alert('Serviço criado com sucesso!');
      // Limpe os campos do formulário se necessário
      document.getElementById('nome').value = '';
      document.getElementById('anotacoes').value = '';
      document.getElementById('preco').value = '';
      document.getElementById('data').value = '';
      document.getElementById('hora').value = '';
      window.location.reload();
    }).catch(function (error) {
      alert('Erro ao criar o serviço: ' + error.message);
    });
  });

});

