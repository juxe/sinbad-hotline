#include <Arduino.h>

#include "AudioFileSourceSD.h"
#include "AudioGeneratorWAV.h"
// #include "AudioGeneratorMP3.h"
#include "AudioOutputI2SNoDAC.h"

AudioGeneratorWAV *wav;
// AudioGeneratorMP3 *sound;
AudioFileSourceSD *file;
AudioOutputI2SNoDAC *out;
// const int sd_ss_pin = D8;
const char* filename = "/mainmenu.wav";
// const char* filename = "/ben.mp3";
void setup()
{
  Serial.begin(115200);
  delay(1000);
  Serial.printf("WAV start\n");

  audioLogger = &Serial;
  file = new AudioFileSourceSD();
  out = new AudioOutputI2SNoDAC();
  wav = new AudioGeneratorWAV();
  // sound = new AudioGeneratorMP3();
  // select the SD card on SPI bus using SS default pin (D8)
  SD.begin(SS);

}

void loop()
{
  if (wav->isRunning()) {
    if (!wav->loop()) {
      wav->stop();
    }
    // delay(2000);
  } else {
    Serial.printf("wav done\n");
    delay(1000);
    // Open file and play it
    if (file->open(filename)) {
      Serial.printf("found file '%s'\n", filename);
      // start to play the file
      // wav->begin(file, out);
      wav->begin(file, out);
      Serial.printf("Playback of '%s' begins...\n", filename);
    } else {
      Serial.printf("Can't find file '%s'\n", filename);
      // return;
    }
  }
}

