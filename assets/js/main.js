$(() => {
  $.get("/city", data => {
    data.map((data, key) => {
      $("#kota-asal").append(
        `<option value='${data.city_id}'>${data.city_name}, ${data.province}</option>`
      );
      $("#kota-tujuan").append(
        `<option value='${data.city_id}'>${data.city_name}, ${data.province}</option>`
      );
    });
    //console.log(kota);

    $("#kota-asal").select2();

    $("#kota-tujuan").select2();
  });

  $("#submit").click(() => {
    let kotaAsal = $("#kota-asal").val();
    let kotaTujuan = $("#kota-tujuan").val();
    let berat = $("#berat").val();
    let kurir = $("#kurir").val();
    // alert(
    //   `Dari ${kotaAsal} Ke ${kotaTujuan} Berat ${berat} Kg Dengan Kurir ${kurir} `
    // );

    $.post("/cost", {
      origin: kotaAsal,
      destination: kotaTujuan,
      weight: berat,
      courier: kurir
    }).done(results => {
      if(results.length > 0){
        results.map( (data, key) => {
            console.log(`${data.service} ${data.description}`);
            console.log(`${data.cost[0].etd}`);
            console.log(`${data.cost[0].value}`);
        });
      }else{
        alert('Data Kosong');
      }
    });
  });
});
