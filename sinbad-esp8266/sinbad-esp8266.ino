#include <Arduino.h>

#include "AudioFileSourceSD.h"
#include "AudioGeneratorWAV.h"
#include "AudioOutputI2SNoDAC.h"

AudioGeneratorWAV *wav;
AudioFileSourceSD *file;
AudioOutputI2SNoDAC *out;
const char* filename = "/mainmenu.wav";
// pin GPIO2 / ESP-12E physical pin 17
const int buttonPin = D0;
int lastButtonState = HIGH;
unsigned long lastButtonTime = 0;
unsigned long debounceDelay = 1000;

void setup()
{
  Serial.begin(115200);
  delay(1000);
  // Serial.printf("WAV start\n");

  audioLogger = &Serial;
  file = new AudioFileSourceSD();
  out = new AudioOutputI2SNoDAC();
  wav = new AudioGeneratorWAV();
  // select the SD card on SPI bus using SS default pin (D8)
  SD.begin(SS);
  // enable button input
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop()
{
  // read the state of the switch into a local variable:
  int buttonState = digitalRead(buttonPin);
  // int buttonState = LOW;
  unsigned long now = millis();
  // Serial.println(now);
  // did button state change after debounce delay?
  if (buttonState != lastButtonState && lastButtonTime + debounceDelay < now) {
    // debounced button state change
    // Serial.printf("button state changed from %d to %d\n", lastButtonState, buttonState);
    // update last button state to current
    lastButtonState = buttonState;
    // update time button was last changed
    lastButtonTime = now;
    if (buttonState == LOW) {
      Serial.printf("playing %s\n", filename);
      // do the thing
      playSound(filename);
    }
  }

  if (wav->isRunning()) {
    if (!wav->loop()) {
      wav->stop();
    }
  }
}

void playSound (const char* filename) {
  Serial.printf("wav done\n");
  delay(1000);
  // Open file and play it
  if (file->open(filename)) {
    Serial.printf("found file '%s'\n", filename);
    // start to play the file
    wav->begin(file, out);
    Serial.printf("Playback of '%s' begins...\n", filename);
  } else {
    Serial.printf("Can't find file '%s'\n", filename);
  }
}
