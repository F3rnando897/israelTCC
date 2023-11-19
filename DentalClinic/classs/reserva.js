document.getElementById('createAgendar').addEventListener('click', function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const selectedDate = document.getElementById('selectedDate').value;
    const selectedTimeSlot = document.getElementById('selectedTimeSlot').value;
    const selectedServiceName = document.getElementById('servicoId').value;
    const paymentMethod = document.getElementById('paymentId').value;
    const notes = document.getElementById('notes').value;

    // Obter o usuário atualmente logado
    const currentUser = Parse.User.current();
    const userId = currentUser.id;

    // Verificar se o dentista foi selecionado
    if (!selectedDentistObjectId) {
        alert('Por favor, selecione um dentista.');
        return;
    }

    // Consultar a tabela "Servico" para obter o objeto correspondente ao valor selecionado
    const Servico = Parse.Object.extend("Servico");
    const queryServico = new Parse.Query(Servico);
    queryServico.equalTo("nome", selectedServiceName);

    queryServico.first().then(function(servico) {
        if (servico) {
            // Criar uma nova instância da classe "Agenda"
            const Agenda = new Parse.Object('Agenda');
            Agenda.set('cliente_id', {
                __type: 'Pointer',
                className: '_User',
                objectId: userId,
            });
            Agenda.set('data', new Date(selectedDate + ' ' + selectedTimeSlot));
            Agenda.set('servico_id', {
                __type: 'Pointer',
                className: 'Servico',
                objectId: servico.id,
            });
            Agenda.set('dentista_id', {
                __type: 'Pointer',
                className: '_User',
                objectId: selectedDentistObjectId, // Usar o objectId do dentista
            });
            Agenda.set('hora', selectedTimeSlot);
            Agenda.set('metodoPagamento', paymentMethod);
            Agenda.set('anotacoes', notes);

            // Salvar a instância da classe "Agenda" no Back4App
            return Agenda.save();
        } else {
            throw new Error("Serviço não encontrado");
        }
    }).then(function(agenda) {
        alert('Agendamento criado com sucesso!');
        // Limpar os campos do formulário se necessário
        document.getElementById('selectedDate').value = '';
        document.getElementById('selectedTimeSlot').value = '';
        document.getElementById('servicoId').value = '';
        document.getElementById('selectedDentist').value = '';
        document.getElementById('paymentId').value = '';
        document.getElementById('notes').value = '';
    }).catch(function(error) {
        alert('Erro ao criar o agendamento: ' + error.message);
    });
});