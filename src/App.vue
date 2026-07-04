<script setup>
import { ref, watch, onMounted } from 'vue'

// 1. Eine (Counter-Logik) reaktive Variable erstellen (Startwert ist 0)
const counter = ref(0)

// 2. Eine Funktion erstellen, die den Zähler um 1 erhöht
function increaseCounter() {
  counter.value++
}

// 3. Eine Funktion erstellen, die den Zähler um 1 herunterzählt
function decreaseCounter() {
  counter.value--
}

// NEU: Ein Array (eine Liste) mit deinen lieblings Programiersprachen
const languages = ref ([
  {id: 1, name: 'HTML & CSS', isEditig: false},
  {id: 2, name: 'JavaScript', isEditig: false},
  {id: 3, name: 'Vue 3', isEditig: false},
])

// Eine leere Varibale, die den Text aus dem Eingabefeld auffängt
const newLanguageName = ref ('')

// Wenn die App im Browser geldaen wird ...
onMounted( () => {
  const savedLanguage = localStorage.getItem('myLanguages') // Hol die Daten

  if (savedLanguage) {
    // Da im localStorage nur Text gespeichert werden kann,
    // verwandeln wir den Text mit JSON.parse in echte JavaScript-Objekte
    languages.value = JSON.parse(savedLanguage)
  }
} )

// Wir beobachten usere Sprachen-Liste
watch(languages, (newLanguages) => {
  // Wir verwandeln die Liste in Text (String) und speichern sie im Browser ab
  localStorage.setItem('myLanguages', JSON.stringify(newLanguages))
}, {deep: true}) // Deep ist pflicht. Es guckt auch in die Objekte (z.B. wenn sich nur der Name ändert)

// Hier fügen wir eine Neue Sprache in die Liste hinzu und prüfen, ob nach dem Trimmen das Feld leer ist
function addNewLanguages() {
  // ... und prüfen, ob nach dem Trimmen das Feld leer ist
  if (newLanguageName.value.trim() === '') return

  // Existiert der Name schon in der Liste
// .some() wandert durch die Liste
// und prüft, ob der eingegebne Name (kleingeschrieben) schon existiert
const alreadyExists = languages.value.some(
  lang => lang.name.toLowerCase() === newLanguageName.value.trim().toLowerCase()
)
// Wenn alreadyExist wahr (true) ist, brechen wir sofort ab
if(alreadyExists) {
  alert('Diese Sprache ist schon in der Liste')
  return
}
// Wenn beide Checks bestanden sind ab in die Liste
  languages.value.push({
    id: Date.now(),
    name: newLanguageName.value.trim(),
    isEditig: false // Startet ganz normal als Text
  })

  newLanguageName.value = ''
}

// Die Löschen-Funktion
// Diese Funktion bekommt die ID von dem Element, das weg soll
function deleteLanguage(idToDelete) {
  // .filter() ist ein eingebauter JavaScript-Befehl für Arrays.
  // Er geht die Liste durch und behält nur die Elemente, bei denen die Bedingung stimmt.
  languages.value = languages.value.filter(lang => lang.id !== idToDelete)
}

function toggleEdit(lang) {
  // Wenn wir gerade im Edit-Modus sind
  // und auf Speichern drückt, prüfen wir zuerst den Text
  if (lang.isEditig) {
  // Wenn das Feld nach dem Trimmen komplet leer ist ...
  if(lang.name.trim() === '') {
  alert('Der Name darf nicht leer sein!')
  }
  // Wenn der Text gültig ist, trimmen wir ihn vor dem Speichern
  lang.name = lang.name.trim()
  }
  // Wenn es false war, wird es true. Wenn es true war, wird es false
  // Das Aufrufezeichen ! kehrt den Wert einfach um (wie ein Lichtschalter).
  lang.isEditig = !lang.isEditig
}

</script>

<template>
  <main>
    <!-- 1. Der Haupt-Hintergrund: Füllt den ganzen Blidschirm, macht ihn hellgrau und zentriert alles -->
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <!-- 2. Die App-Karte: Eine weiße Box mit Schatten und abgerundeten Ecken -->
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <!-- 3. Die Überschrift: Modernes Indigo-Blau, zentriert und mit Abstand nach unten -->
        <h1 class="text-3xl font-bold text-center text-indigo-600 mb-6">
          Sprachen-Planer
        </h1>

              <!-- Text-Interpolation: Zeigt den aktuellen Wert derVariable an -->
            <!-- <p>Aktuelle Klicks {{ counter }}</p> -->

            <!-- Ein Event-Klick: Löst die Funktion aus -->
           <!-- <button @click="increaseCounter">Plus (+)</button> -->

              <!-- Ein Event-Klick: Löst die Funktion aus -->
             <!-- <button @click="decreaseCounter">Minus (-)</button> -->

              <!-- Hierr startet das WENN/DANN Prinzip -->

             <!-- <div class="message-container"> -->

            <!-- Wenn der Zähler größer oder gleich 5 ist -->
            <p v-if="counter >= 5" class="warning">
             Achtung: Du hast 5 oder mehr Klicks erreicht!
            </p>

             <!-- Wenn der Zähler kleiner 0 ist -->
             <p v-else-if="counter < 0" class="warning">
                Du bist im minus Bereich!
             </p>

               <!-- Wenn die obere Bedingung NICHT zutrifft -->
            <!-- <p v-else class="info">
                Alles im grünen Bereich. Klicke weiter!
              </p> -->

              <!-- Das Eingabefeld (Hier macht v-model seine Arbeit) -->
         <div class="flex gap-2 mb-6">
              <input 
              id="new-language-input"
              v-model="newLanguageName" 
                  @keyup.enter="addNewLanguages"
                    type="text" 
                    placeholder="Füge eine neue Sprache hinzu..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-leg foocus:riing-indigo-500 focus:border-transparent"/>
                <button
                 @click="addNewLanguages"
            class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
          Hinzufügen
          </button>

          <!-- Live-Vorschau, um zu sehen, was im Hintergrund passiert -->
          <!-- <p class="preview">Du tippst gerade: <strong>{{ newLanguageName }}</strong></p> -->
         </div>

        <!-- Hier startet die Schleife -->
        <!-- <div class="list-container"> -->
          <!-- Der Titel für die Tech-Stack Liste -->
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">Meine Tech-Stack Liste:</h2>
          <!-- Die Liste als Container -->
          <ul class="space-y-3">
            <!-- Für 'jedes' lang in der Liste 'languages' erstelle ein <li> -->
            <li 
            v-for="lang in languages" 
            :key="lang.id" 
            class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">

              <!-- Wenn wir im Edit-Modus sind: Zeige das Eingabefeld -->
              <div v-if="lang.isEditig" class="flex item-center gap-2 w-full">
                <input
                id="'edit-language-' + lang.id"
                v-model="lang.name" 
                type="text" 
                class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outlind-none focus:ring-2 focus:ring-indigo-500"/>
                <button 
                 @click="toggleEdit(lang)"
                 class="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors">
                Speichern</button>
               </div>

               <!-- Ansonsten: Zeige den ganz normalen Text und den Bearbeiten-Button -->
            <div v-else class="flex items-center justify-between w-full">
                  <!-- Text mit Raketen-Emoji -->
                  <span class="text-gray-700 font-medium flex item-center gap-2">🚀 {{ lang.name }}</span>
                   

                  <!-- Die Buttons rechts sauber nebeneinander -->
                <div class="flex items-center gap-2">

                  <button 
                  @click="toggleEdit(lang)"
                  class="px-3 px-1 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transiton-colors"
                  >Bearbeiten</button>

                  <button 
                  @click="deleteLanguage(lang.id)"
                  class="px-3 py-1 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                  >Löschen</button>

                </div>

            </div>
               
             <!--🚀 {{ lang.name }} -->

             <!-- Der Löschen-Button neben jedem Element -->
              <!-- Wenn man klickt (@click), rufrn wir deleteLanguage auf -->
               <!-- Wir übergeben genau die ID von dieser Sprache lang.id -->
              <!--  <button class="delete-btn" @click="deleteLanguage(lang.id)">❌</button> -->
            </li>
          </ul>
        <!-- </div> -->

          <!-- </div> -->

      </div>  <!-- Schließt die weiße App-Karte -->
    </div> <!-- Schließt den Haupt-Hintergrund -->
  </main>
</template>

<style scoped>
/* main { font-family: sans-serif; text-align: center; margin-top: 5%; } */
p { font-size: 1.5rem; }
/*button { padding: 10px 20px; margin: 5px; font-size: 1rem; background-color: #42b883; color: white; border: none; border-radius: 5px; cursor: pointer; }
.message-container {margin-top: 30px; height: 50px;}
.warning {color: red; font-weight: bold;}
.info {color: #666; font-style: italic;} */

/* Styles für die neue Liste */
/*.list-container {margin-top: 40px; text-align: left; display: inline-block;}
ul {list-style: none; padding: 0;}
li {font-size: 1.2rem; padding: 5px 0; color: #2c3e50;}

/* Styles für das Eingabefeld */
/*.input-container {margin-top: 30px;}
input {padding: 10px; font-size: 1rem; border: 2px solid #42b883; border-radius: 4px; width: 250px;}
.preview {font-size: 1rem; color: #7f8c8d; margin-top: 10px;}

/* Schickes Styling für das rote x */
/* .delete-btn {background: none; border: none; color: red; cursor: pointer; font-size: 1rem; padding: 0 5px; margin-left: 10px;}
.delete-btn:hover {transform: scale(1.2);} */
</style>
