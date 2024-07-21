$(document).ready(function () {
  $("#studId").focus();

  $("#studId").on("change", function () {
    var studIdVar = $("#studId").val();
    if (studIdVar !== "") {
      checkRollNoExistence(studIdVar);
    } else {
      resetForm();
    }
  });
});

function enableFormForSave() {
  $("#studName, #studClass, #studDob, #studAddr, #studEnroll").prop(
    "disabled",
    false
  );
  $("#empSave, #empReset").prop("disabled", false);
  $("#studName").focus();
}

function enableFormForUpdate() {
  $("#studName, #studClass, #studDob, #studAddr, #studEnroll").prop(
    "disabled",
    false
  );
  $("#empUpdate, #empReset").prop("disabled", false);
  $("#studId").prop("disabled", true);
  $("#studName").focus();
}

function resetForm() {
  $("#studId, #studName, #studClass, #studDob, #studAddr, #studEnroll")
    .val("")
    .prop("disabled", true);
  $("#empSave, #empUpdate, #empReset").prop("disabled", true);
  $("#studId").prop("disabled", false).focus();
}

function checkRollNoExistence(rollNo) {
  var getRequest = createGET_BY_KEYRequest(
    "90932191|-31949215761178967|90963462",
    "SCHOOL",
    "Student",
    JSON.stringify({ Roll_No: rollNo })
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    "http://api.login2explore.com:5577",
    "/api/irl"
  );
  jQuery.ajaxSetup({ async: true });

  if (resJsonObj.status === 200) {
    var data = JSON.parse(resJsonObj.data).record;
    $("#studName").val(data.studName);
    $("#studClass").val(data.studClass);
    $("#studDob").val(data.studDob);
    $("#studAddr").val(data.studAddr);
    $("#studEnroll").val(data.studEnroll);
    enableFormForUpdate();
  } else {
    enableFormForSave();
  }
}

function validateAndGetFormData() {
  var studIdVar = $("#studId").val();
  if (studIdVar === "") {
    alert("Roll-No is a required value");
    $("#studId").focus();
    return "";
  }

  var studNameVar = $("#studName").val();
  if (studNameVar === "") {
    alert("Student Name is a required value");
    $("#studName").focus();
    return "";
  }
  var studClassVar = $("#studClass").val();
  if (studClassVar === "") {
    alert("Class is a required value");
    $("#studClass").focus();
    return "";
  }
  var studDobVar = $("#studDob").val();
  if (studDobVar === "") {
    alert("Birth-Date is a required value");
    $("#studDob").focus();
    return "";
  }
  var studAddrVar = $("#studAddr").val();
  if (studAddrVar === "") {
    alert("Address is a required value");
    $("#studAddr").focus();
    return "";
  }
  var studEnrollVar = $("#studEnroll").val();
  if (studEnrollVar === "") {
    alert("Enrollment-Date is a required value");
    $("#studEnroll").focus();
    return "";
  }
  var jsonStrObj = {
    studName: studNameVar,
    studClass: studClassVar,
    studDob: studDobVar,
    studAddr: studAddrVar,
    studEnroll: studEnrollVar,
  };
  return jsonStrObj;
}

function saveStudent() {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  jsonStr.Roll_No = $("#studId").val();
  var putReqStr = createPUTRequest(
    "90932191|-31949215761178967|90963462",
    JSON.stringify(jsonStr),
    "SCHOOL",
    "Student"
  );
  // alert(putReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert("Data added successfylly");
  jQuery.ajaxSetup({ async: true });
  resetForm();
}

function updateStudent() {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var updateReqStr = JSON.stringify({
    token: "90932191|-31949215761178967|90963462",
    cmd: "UPDATE",
    dbName: "SCHOOL",
    rel: "Student",
    jsonStr: {
      [$("#studId").val()]: jsonStr,
    },
  });
  // alert(updateReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    updateReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert("Data Update successfylly");
  jQuery.ajaxSetup({ async: true });
  resetForm();
}
