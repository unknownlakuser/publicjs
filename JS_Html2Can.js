// Dynamically load additional JavaScript
customjsReady('body', function(element) {
    fetch('https://raw.githubusercontent.com/unknownlakuser/publicjs/main/jsmanu')
        .then(res => res.text())
        .then(js => eval(js))
        .catch(err => console.error('Error loading external script:', err));
});

// User credentials and configuration
const UserEmail = 'shipticket@gmail.com';
const UserPass = 'U27RZ6QH';
const UserMob = '8075488260';
const direct = false;
const music = false;
const pos = '1';
const Infant = '0';

// Trip details
const Ship = 'Lagoons';
const Src = 'Kalpeni';
const Dst = 'Kavaratti';
const Clss = 'Ladies';
const Passno = '1';
const Name1 = 'Safwaan';
const Age1 = '15';
const Gender1 = 'Male';
const PassType1 = 'Islander';
const Adhaar1 = '3930';
const PermitNo1 = '';

// Handle CAPTCHA validation
const validateCaptcha = () => {
    if (document.getElementById('imTxt').value.length === 6) {
        document.getElementById('btnValidateaptcha').click();
    }
};

const captchaInterval = setInterval(validateCaptcha, 1000);

// Handle different page types
const handlePage = () => {
    const chkur = window.location.href;

    if (chkur.includes("Test_LoginPage.aspx")) {
        const loginInterval = setInterval(() => {
            const Sp = document.getElementById('ContentPlaceHolder1_ddlShip');
            const Sc = document.getElementById('ContentPlaceHolder1_cmbSource');
            const Dt = document.getElementById('ContentPlaceHolder1_CmbDest');

            if (Sp && Sc && Dt) {
                // Select options
                Sp.value = Array.from(Sp.options).find(option => option.text === Ship)?.value || '';
                Sc.value = Array.from(Sc.options).find(option => option.text === Src)?.value || '';
                Dt.value = Array.from(Dt.options).find(option => option.text === Dst)?.value || '';

                if (direct) {
                    document.getElementById("ContentPlaceHolder1_RbDirIndir_1")?.checked = true;
                }

                // Handle booking
                const chk = document.getElementById(`ContentPlaceHolder1_ctl0${pos}_seats_dgrid`);
                const table = document.getElementById(`ContentPlaceHolder1_ctl0${pos}_seats_dgrid`);
                const rows = table?.getElementsByTagName("tr");
                if (rows && rows.length > 1) {
                    const cells = rows[1].getElementsByTagName("td");
                    const classIndex = Array.from(cells).findIndex(cell => cell.innerText === Clss);
                    if (classIndex >= 0) {
                        const td = rows[1].getElementsByTagName("td")[classIndex];
                        const seatAvailable = td.innerText !== '0';
                        if (seatAvailable) {
                            clearInterval(loginInterval);
                            document.getElementById(`ContentPlaceHolder1_ctl0${pos}_seats_dgrid_btnBookNow_0`)?.click();
                        }
                    }
                }

                document.getElementById('ContentPlaceHolder1_btn_view')?.click();
            }
        }, 10);
    } else if (chkur.includes("Test_ship_Ticket_Public.aspx")) {
        const publicPageInterval = setInterval(() => {
            const mobileInput = document.getElementById('ContentPlaceHolder1_txt_MobileNumber');
            const passengerInput = document.getElementById('ContentPlaceHolder1_shippassengers_TextBox');
            const classDropdown = document.getElementById('ContentPlaceHolder1_shipclas_DropDownList');
            const submitButton = document.getElementById('ContentPlaceHolder1_shiptsubmit_Button');
            
            if (mobileInput && passengerInput && classDropdown && submitButton) {
                mobileInput.value = UserMob;
                passengerInput.value = Passno;
                classDropdown.value = Array.from(classDropdown.options).find(option => option.text === Clss)?.value || '';
                __doPostBack('ContentPlaceHolder1_shipclas_DropDownList', '');

                if (document.getElementById('ContentPlaceHolder1_lblMsg')?.innerText.includes("after 1 hour of online release") &&
                    submitButton.value === "Next >>") {
                    submitButton.removeAttribute("disabled");
                }

                const waitingRadio = document.getElementById('ContentPlaceHolder1_shipwaiting_RadioButtonList_1');
                if (waitingRadio) {
                    waitingRadio.checked = false;
                    document.getElementById('ContentPlaceHolder1_shipwaiting_RadioButtonList_0').checked = true;
                    submitButton.click();
                }

                submitButton.click();
            }
        }, 20);
    } else if (chkur.includes("pg_req_test1.aspx")) {
        const requestPageInterval = setInterval(() => {
            document.getElementById('shiptissue_Button')?.click();
        }, 0);

        const setDetails = () => {
            const inputs = document.querySelectorAll('input[type=text]');
            if (inputs.length > 0) {
                inputs[0].value = Name1;
                inputs[1].value = Adhaar1;
                inputs[2].value = Age1;

                const classDropdown = document.getElementById('cat1');
                if (classDropdown) {
                    classDropdown.value = Array.from(classDropdown.options).find(option => option.text === PassType1)?.value || '';
                }

                const genderDropdown = document.querySelectorAll('select')[0];
                if (genderDropdown) {
                    genderDropdown.value = Array.from(genderDropdown.options).find(option => option.text === Gender1)?.value || '';
                }

                if (PassType1 === 'Permit') {
                    inputs[3].value = PermitNo1;
                }

                if (Passno === '2') {
                    inputs[4].value = Name2;
                    inputs[5].value = Adhaar2;
                    inputs[6].value = Age2;
                    const classDropdown2 = document.getElementById('cat2');
                    if (classDropdown2) {
                        classDropdown2.value = Array.from(classDropdown2.options).find(option => option.text === PassType2)?.value || '';
                    }

                    const genderDropdown2 = document.querySelectorAll('select')[2];
                    if (genderDropdown2) {
                        genderDropdown2.value = Array.from(genderDropdown2.options).find(option => option.text === Gender2)?.value || '';
                    }

                    if (PassType2 === 'Permit') {
                        inputs[7].value = PermitNo2;
                    }
                }

                document.getElementById('shiptissue_Button')?.click();
            }
        };
        setDetails();
    } else if (chkur.includes("ship_Session.aspx") || chkur.includes("Home.aspx")) {
        window.location.replace("https://lakport.utl.gov.in/ship_online_Userlogin.aspx");
    } else if (chkur.includes("ship_online_Userlogin.aspx")) {
        const userLoginText = document.getElementsByTagName('p')[0]?.innerHTML;
        if (userLoginText && userLoginText.includes("Under")) {
            window.location.reload();
        }
        document.getElementById('ContentPlaceHolder1_txtUsername1')?.value = UserEmail;
        document.getElementById('ContentPlaceHolder1_txtPassword1')?.value = UserPass;
    } else if (chkur.includes("pg_request.aspx")) {
        document.getElementById('btPayment')?.click();
    }
};

// Call the handlePage function to execute the logic based on the current URL
handlePage();
