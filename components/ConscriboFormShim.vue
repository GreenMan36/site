<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="cwfForm CWF table" v-html="shimHTML"></div>
</template>

<script setup lang="ts">
// purely presentational shim – markup lives in a string to avoid
// the Vue compiler treating it as a real layout table.
const shimHTML = `
<table class="formTable">
    <tr>
      <td colspan="4" rowspan="1">
        <div class="mainContainer">
          <div class="textDiv">Dit formulier is nog aan het laden...</div>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Voornaam</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 100px;"></div>
          <div class="inputLabel">Tussenvoegsel</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 50px;"></div>
          <div class="inputLabel">Achternaam</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 200px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Geboortedatum</div>
          <div class="inputDivWithLabel">
            <input disabled type="text">
          </div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">E-mailadres</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="mailadresField" style="width: 440px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Telefoonnummer</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="numberField" style="width: 440px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Noodnummer<br>Niet verplicht; kan wel handig zijn, mocht er iets gebeuren tijdens activiteiten, reizen of excursies.</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="numberField" style="width: 400px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Postcode</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 100px;"></div>
          <div class="inputLabel">Plaatsnaam</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 200px;"></div>
          <div class="inputLabel">Huisnummer toevoeging</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 50px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Straatnaam</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="textField" style="width: 200px;"></div>
          <div class="inputLabel">Huisnummer</div>
          <div class="inputDivWithLabel"><input disabled type="text" class="numberField" style="width: 50px;"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Bankrekeningnummer</div>
          <div class="inputDivWithLabel">
            <table class="accountTable">
              <tr>
                <td>IBAN: </td>
                <td><input disabled type="text" style="width: 200px;" class="validValue"></td>
                <td>BIC: </td>
                <td><input disabled type="text" style="width: 100px;"></td>
              </tr>
              <tr>
                <td>t.n.v.: </td>
                <td colspan="3"><input disabled type="text" style="width: 200px;"></td>
              </tr>
            </table>
          </div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Ik ga ermee akkoord dat er jaarlijks per automatische incasso €20 zal worden afgeschreven van<br>de ingevulde betaalrekening voor het betalen van de contributie</div>
          <div class="inputDivWithLabel"><input disabled type="checkbox"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Ik ben momenteel</div>
          <div class="inputDivWithLabel">
            <select disabled>
              <option value="0">Formulier is nog aan het laden...</option>
            </select>
          </div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Afstudeerrichting</div>
          <div class="inputDivWithLabel">
            <select disabled>
              <option value="Loading...">Formulier is nog aan het laden...</option>
            </select>
          </div>
        </div>
      </td>
      <td class="emptyCell"></td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Ik ga akkoord met <a href="https://indicium.hu/privacyreglement">het privacyreglement</a></div>
          <div class="inputDivWithLabel"><input disabled type="checkbox"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
        <div class="mainContainer">
          <div class="inputLabel">Ik ga akkoord met <a href="https://indicium.hu/statuten">de statuten en het huishoudelijk reglement</a>&nbsp;</div>
          <div class="inputDivWithLabel"><input disabled type="checkbox"></div>
        </div>
      </td>
      <td class="emptyCell"></td>
    </tr>
  </table>
  <button class="submitButton" type="button" disabled>Formulier laden...</button>
`;
</script>

<style scoped lang="scss">
.cwfForm {
  /* reuse overall form styles if needed */
  width: 100%;
  max-width: 1000px;
}

/* skeleton elements */
.shim-text,
.shim-label,
.shim-input,
.shim-button {
  background-color: color-mix(in srgb, var(--text-color) 18%, transparent);
  border-radius: 4px;
}

.shim-text {
  height: 1.5rem;
  margin: 1rem 0;
}

.shim-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0;
}

.shim-label {
  width: 120px;
  height: 1rem;
}

.shim-input {
  flex: 1;
  height: 1.5rem;
}

.shim-button {
  width: 200px;
  height: 2rem;
  margin: 1rem 0;
}

.loadingState {
  padding: 2rem;
  text-align: center;
  font-weight: bold;
  color: var(--text-color);
}
</style>
