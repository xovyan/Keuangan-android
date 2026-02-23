let data = JSON.parse(localStorage.getItem("keuanganData")) || [];

function updateSaldo(){
let saldo=0;
data.forEach(d=>{
if(d.tipe==="masuk"){
saldo+=Number(d.nominal);
}else{
saldo-=Number(d.nominal);
}
});
document.getElementById("saldo").innerText=
"Rp "+saldo.toLocaleString("id-ID");
}

function showForm(tipe){
document.getElementById("formArea").innerHTML=`
<input type="date" id="tanggal">
<input type="text" id="keterangan" placeholder="Keterangan">
<input type="number" id="nominal" placeholder="Nominal (Rp)">
<button onclick="simpan('${tipe}')" class="btn green">Simpan</button>
`;
}

function simpan(tipe){
let obj={
tanggal:document.getElementById("tanggal").value,
keterangan:document.getElementById("keterangan").value,
nominal:document.getElementById("nominal").value,
tipe:tipe
};

data.push(obj);
localStorage.setItem("keuanganData",JSON.stringify(data));
render();
document.getElementById("formArea").innerHTML="";
}

function render(){
let list=document.getElementById("list");
list.innerHTML="";

data.forEach((d,i)=>{
list.innerHTML+=`
<div class="item">
<div>
<span>${d.tanggal}</span><br>
<span>${d.keterangan}</span><br>
<span style="color:${d.tipe==="masuk"?"green":"red"}">
Rp ${Number(d.nominal).toLocaleString("id-ID")}
</span>
</div>
<button class="delete" onclick="hapus(${i})">X</button>
</div>
`;
});
updateSaldo();
}

function hapus(i){
data.splice(i,1);
localStorage.setItem("keuanganData",JSON.stringify(data));
render();
}

function exportData(){
let text="LAPORAN KEUANGAN\n\n";
data.forEach(d=>{
text+=`${d.tanggal} - ${d.keterangan} - Rp ${d.nominal}\n`;
});

let blob=new Blob([text],{type:"text/plain"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="laporan_keuangan.txt";
a.click();
}

render();
