const { exec } = require('child_process');

// Ejecutar la calavera antes de iniciar el servidor
exec('node skull.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error ejecutando la calavera: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);

  // Iniciar ng serve después de mostrar la calavera
  exec('ng serve', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando ng serve: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
