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
    let berat = $("#berat").val() * 1000;
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
      if (results.length > 0) {
        $("p").remove();
        results.map((data, key) => {
          let bilangan = data.cost[0].value;
          let reverse = bilangan.toString().split("").reverse().join(""),
              ribuan = reverse.match(/\d{1,3}/g);
              ribuan = ribuan.join(".").split("").reverse().join("");

          $("#result").append(`<p id='r'>
              Paket ${data.service} ${data.description} | Estimasi Hari ${data
            .cost[0].etd} | Biaya Rp.${ribuan}
            </p>`);

          // console.log(`${data.service} ${data.description}`);
          // console.log(`${data.cost[0].etd}`);
          // console.log(`${data.cost[0].value}`);
        });
      } else {
        alert("Data Kosong");
      }
    });
  });
});
