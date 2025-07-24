const invitados = [
  { codigo: "ENR654", nombre: "Enrique Ramírez", pases: 2 },
  { codigo: "LUI123", nombre: "Luis Torres", pases: 1 },
  { codigo: "ANA789", nombre: "Ana Gómez", pases: 2 },
  { codigo: "CAR456", nombre: "Carlos López", pases: 1 },
  { codigo: "MAR321", nombre: "María Sánchez", pases: 2 },
  { codigo: "FER098", nombre: "Fernando Pérez", pases: 2 },
  { codigo: "ISA234", nombre: "Isabel Díaz", pases: 1 },
  { codigo: "JOR765", nombre: "Jorge Herrera", pases: 2 },
  { codigo: "LUC567", nombre: "Lucía Romero", pases: 2 },
  { codigo: "DAN890", nombre: "Daniela Ruiz", pases: 1 },
  { codigo: "JAV111", nombre: "Javier Mendoza", pases: 2 },
  { codigo: "PAU222", nombre: "Paula Castillo", pases: 1 },
  { codigo: "AND333", nombre: "Andrés Morales", pases: 2 },
  { codigo: "NAT444", nombre: "Natalia Flores", pases: 3 },
  { codigo: "SER555", nombre: "Sergio Campos", pases: 1 },
  { codigo: "BET666", nombre: "Beto Reyes", pases: 2 },
  { codigo: "MON777", nombre: "Monserrat Ríos", pases: 2 },
  { codigo: "ALE888", nombre: "Alejandro Navarro", pases: 3 },
  { codigo: "VIC999", nombre: "Victoria León", pases: 2 },
  { codigo: "RAU000", nombre: "Raúl Cordero", pases: 2 },
  { codigo: "MAR112", nombre: "Marisol Ortega", pases: 1 },
  { codigo: "FRA113", nombre: "Francisco Lima", pases: 2 },
  { codigo: "LIZ114", nombre: "Lizbeth Acosta", pases: 2 },
  { codigo: "DIE115", nombre: "Diego Meza", pases: 1 },
  { codigo: "KAR116", nombre: "Karen Treviño", pases: 2 },
  { codigo: "JOR117", nombre: "Jorge Ramírez", pases: 2 },
  { codigo: "YAZ118", nombre: "Yazmín Cruz", pases: 2 },
  { codigo: "FAT119", nombre: "Fátima Rivera", pases: 1 },
  { codigo: "LUA120", nombre: "Luis Alberto", pases: 2 },
  { codigo: "MIG121", nombre: "Miguel Bravo", pases: 2 }
];


const params = new URLSearchParams(window.location.search);
const codigo = params.get('codigo');
const invitado = invitados.find(i => i.codigo === codigo);

if (!invitado) {
  document.querySelector('.confirmation__container').innerHTML = `
    <p style="color: red;">Código inválido. Intenta de nuevo.</p>
  `;
} else {
  const guestInfo = document.getElementById('passInfo');
  guestInfo.textContent = `Hola ${invitado.nombre}! Tienes derecho a ${invitado.pases} pase(s).`;

  const attendingSelect = document.getElementById('attending');
  const companionsQuestion = document.getElementById('companionsQuestion');
  const companionsComingSelect = document.getElementById('companionsComing');
  const companionsContainer = document.getElementById('companionsContainer');

  attendingSelect.addEventListener('change', () => {
    if (attendingSelect.value === 'Sí' && invitado.pases > 1) {
      companionsQuestion.style.display = 'block';
    } else {
      companionsQuestion.style.display = 'none';
      companionsComingSelect.value = "";
      companionsContainer.innerHTML = '';
      companionsContainer.style.display = 'none';
    }
  });

  companionsComingSelect.addEventListener('change', () => {
    companionsContainer.innerHTML = '';

    if (companionsComingSelect.value === 'Sí') {
      companionsContainer.style.display = 'block';
      const maxAcompanantes = invitado.pases - 1;
      for (let i = 1; i <= maxAcompanantes; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `acompanante${i}`;
        input.placeholder = `Nombre del acompañante ${i}`;
        input.required = true;
        companionsContainer.appendChild(input);
      }
    } else {
      companionsContainer.style.display = 'none';
    }
  });

  const form = document.getElementById('confirmationForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const asistira = attendingSelect.value;
    const vanAcompanantes = companionsComingSelect.value;
    const acompanantes = [];

    if (vanAcompanantes === 'Sí') {
      const inputs = companionsContainer.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.value.trim()) acompanantes.push(input.value.trim());
      });
    }

    const numAsistentes = 1 + acompanantes.length;

    const confirmacion = {
      codigo: invitado.codigo,
      asistira,
      acompanantes: acompanantes.length,
      nombresAcompanantes: acompanantes.join(', '),
      comentarios: ""
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyXGu8qnwdzm2McXDc3gVRgHb8Jy3B9NHqHsInsfJ6pcv-FGIVEFAR36CESllvjoWpu/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmacion)
      });

      const data = await response.json();

      if (data.status === 'ok') {
        console.log("Confirmación exitosa");
        // Aquí podrías redirigir, mostrar un mensaje, etc.
      } else {
        console.error("Error del servidor:", data.message);
        alert("Hubo un problema: " + data.message);
      }

    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al enviar datos. Intenta de nuevo.");
    }
  });
}
