window.onload = function() {
  var tiempo = document.getElementById('tiempo'),
      iniciar = document.getElementById('iniciar'),
      pausar = document.getElementById('pausar'),
      reiniciar = document.getElementById('reiniciar'),
      progressBar = document.querySelector('.progress'),
      temporizadorId,
      tiempoTotal = 60,
      tiempoRestante = tiempoTotal * 1000,
      estaPausado = false;
  
  var audioFin = new Audio('juegoterminado.mp3'); // Cambia a la URL de tu archivo de audio para el final
  var audioLast10Seconds = new Audio('10segworter.mp3'); // Cambia a la URL de tu archivo de audio para los últimos 10 segundos

  // Inicializar la barra de progreso al 100%
  progressBar.style.width = '100%';

  function actualizarTiempo() {
    if (!estaPausado) {
      var minutos = Math.floor(tiempoRestante / 60000);
      var segundos = Math.floor((tiempoRestante % 60000) / 1000);

      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;

      tiempo.textContent = minutos + ":" + segundos;

      if (tiempoRestante === 10000) {
        audioLast10Seconds.play(); // Reproduce el audio para los últimos 10 segundos
      }

      if (tiempoRestante <= 0) {
        clearInterval(temporizadorId);
        tiempo.textContent = "00:00";
        progressBar.style.width = '0%';
        tiempo.classList.remove('pulsing');
        audioFin.play(); // Reproduce el audio al finalizar el temporizador
      } else {
        tiempoRestante -= 1000;
        actualizarBarraDeProgreso();
      }
    }
  }

  function actualizarBarraDeProgreso() {
    var porcentaje = tiempoRestante / (tiempoTotal * 1000);
    progressBar.style.width = porcentaje * 100 + '%';
  }

  iniciar.onclick = function() {
    if (!temporizadorId) {
      estaPausado = false;
      tiempo.classList.add('pulsing');
      temporizadorId = setInterval(actualizarTiempo, 1000);
    }
  };

  pausar.onclick = function() {
    estaPausado = !estaPausado;
    pausar.textContent = estaPausado ? "Reanudar" : "Pausar";
    tiempo.classList.toggle('pulsing');
  };

  reiniciar.onclick = function() {
    clearInterval(temporizadorId);
    temporizadorId = null;
    tiempoRestante = tiempoTotal * 1000;
    actualizarTiempo();
    progressBar.style.width = '100%';
    estaPausado = false;
    pausar.textContent = "Pausar";
    tiempo.classList.remove('pulsing');
    audioFin.pause();
    audioFin.currentTime = 0;
  };
};











