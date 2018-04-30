//создание хэша
const crypto=require("crypto");
const secp256k1=require("secp256k1");

var str = "Welcome in Blockchain!";
var digested = crypto.createHash("sha256").update(str).digest();
console.log("str: " + str + ", result:" + digested);

//создание приватного ключа
let privateKey;
do {
    privateKey = crypto.randomBytes(32);
    console.log("try: " + privateKey);
}while(!secp256k1.privateKeyVerify(privateKey));

//создание публичногоо ключа
const publicKey = secp256k1.publicKeyCreate(privateKey);

//создание цифровой подписи
const sig0bj = secp256k1.sign(digested, privateKey);

//создаем сигнатуру для отправки другому пользователю
const sig = sig0bj.signature;

//проверка ЭЦП на стороне другого пользователя
let verified = secp256k1.verify(digested, sig, publicKey);

//выводы
console.log('private key: ',privateKey);
console.log('public key: ', publicKey);
console.log('sig: ', sig);
console.log('verified', verified);
