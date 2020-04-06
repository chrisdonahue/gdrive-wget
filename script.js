const gdriveUriInputEl = document.getElementById("gdrive-uri");
const fileFnInputEl = document.getElementById("file-fn");
const fileLargeInputEl = document.getElementById("file-large");
const copyButtonEl = document.getElementById("copy");
const wgetCmdCodeEl = document.getElementById("wget-cmd");

let wgetCmd = "";

function copyToClipboard() {
  const text = wgetCmd;
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function onChange() {
  const gdriveUri = gdriveUriInputEl.value;
  if (gdriveUri.length === 0) {
    return;
  }

  const gdriveIdSplit = gdriveUri.split("=");
  const gdriveId = gdriveIdSplit[gdriveIdSplit.length - 1];
  const fileFn = fileFnInputEl.value;

  if (fileLargeInputEl.checked) {
    wgetCmd = `wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=${gdriveId}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\\1\\n/p')&id=${gdriveId}" -O ${fileFn} && rm -rf /tmp/cookies.txt`;
  } else {
    wgetCmd = `wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=${gdriveId}' -O ${fileFn}`;
  }

  wgetCmdCodeEl.innerHTML = wgetCmd;
  copyButtonEl.style.display = "block";
}

gdriveUriInputEl.oninput = onChange;
fileFnInputEl.oninput = onChange;
fileLargeInputEl.onclick = onChange;
copyButtonEl.onclick = copyToClipboard;
