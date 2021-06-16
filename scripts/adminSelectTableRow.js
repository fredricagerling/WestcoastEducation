'use strict';

const searchTable = () => {
  $("#search").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#overviewTable tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
};

const highlightTableRow = () => {
  $("tr").not(':first').hover(
    function () {
      $(this).css("background", "var(--hover-table)").css("cursor", "default");
    },
    function () {
      $(this).css("background", "");
    }
  );
};