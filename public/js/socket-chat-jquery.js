// funciones para renderizar usuarios
const paramsurl = new URLSearchParams(window.location.search);

//referencias de jquery
const divUsuarios = $('#divUsuarios');

function renderizarUsuarios(personas) {
    var html = '';
    html += `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span> ${paramsurl.get('sala')}</span></a>
            </li>`;


    for (let i in personas) {
        html += `<li>
                    <a data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
                </li>`;
    }

    divUsuarios.html(html);

}