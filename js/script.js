var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    loadMain(JSON.parse(this.responseText));
  }
};
xmlhttp.open("GET", "./src/send-off.json", true);
xmlhttp.send();

function loadMain(file_json) {
  let resp = ''
  for (let room in file_json) {
    resp += '<div id="' + room + '" class="title">' + file_json[room]['RoomName'] + '</div>'
    for (let item in file_json[room]['Item']) {
      resp += '<div class="item'
      if (file_json[room]['Item'][item]['Action'] === 'Reservado') resp += ' reservado'
      if (file_json[room]['Item'][item]['Action'] === 'Vendido') resp += ' vendido'
      resp += '"><div class="item-info"><div class="item-key"><div>Código</div><div class="larger">Item</div><div>Status</div><div>Disponib.</div><div>Sugestão</div></div><div class="item-value"><div>'
      resp += item.substring(3, 8)
      resp += '</div><div  class="larger" title="'
      resp += file_json[room]['Item'][item]['Name']
      resp += '">'
      resp += file_json[room]['Item'][item]['Name']
      resp += '</div><div>'
      resp += file_json[room]['Item'][item]['Action']
      resp += '</div><div>'
      resp += file_json[room]['Item'][item]['Availability']
      resp += '</div><div>R$ '
      resp += file_json[room]['Item'][item]['Price']      
      resp += '</div></div></div><div class="item-picture">'
      for (let p = Number(file_json[room]['Item'][item]['PictureMin']); p <= Number(file_json[room]['Item'][item]['PictureMax']); p++) {
        resp += '<a href="./img/picture/'
        resp += item + '_' + p
        resp += '.JPG" target="_blank"><img src="./img/thumbnail/'
        resp += item + '_' + p
        resp += '.JPG"></a>'
      }
      resp += '</div><div class="item-note"><div class="item-key"><div>Quantid.</div><div>Altura</div><div>Largura</div><div>Profund.</div><div>Avaria</div></div><div class="item-value"><div>'
      resp += file_json[room]['Item'][item]['Quantity']
      resp += '</div><div>'
      resp += file_json[room]['Item'][item]['Height']
      if (file_json[room]['Item'][item]['Height'] !== '-') resp += 'cm'
      resp += '</div><div>'
      resp += file_json[room]['Item'][item]['Width']
      if (file_json[room]['Item'][item]['Width'] !== '-') resp += 'cm'
      resp += '</div><div>'
      resp += file_json[room]['Item'][item]['Depth']
      if (file_json[room]['Item'][item]['Depth'] !== '-') resp += 'cm'
      resp += '</div><div title="'
      resp += file_json[room]['Item'][item]['Damage']
      resp += '">'
      resp += file_json[room]['Item'][item]['Damage']
      resp += '</div></div></div></div>'
    }
  }
  for (let i = 0; i < 32; i++) resp += "<br>"
  document.getElementById('main').innerHTML = resp
}
