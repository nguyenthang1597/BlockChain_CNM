const vstruct = require('varstruct');
const base32 = require('base32.js');
const { Keypair } = require('stellar-base');

const Transaction = vstruct([
  { name: 'version', type: vstruct.UInt8 },
  { name: 'account', type: vstruct.Buffer(35) },
  { name: 'sequence', type: vstruct.UInt64BE },
  { name: 'memo', type: vstruct.VarBuffer(vstruct.UInt8) },
  { name: 'operation', type: vstruct.UInt8 },
  { name: 'params', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  { name: 'signature', type: vstruct.Buffer(64) },
]);

const CreateAccountParams = vstruct([
  { name: 'address', type: vstruct.Buffer(35) },
]);

const PaymentParams = vstruct([
  { name: 'address', type: vstruct.Buffer(35) },
  { name: 'amount', type: vstruct.UInt64BE },
]);

const EncryptionKey = vstruct([
  { name: 'nonce', type: vstruct.Buffer(24) },
  { name: 'box', type: vstruct.Buffer(42) },
]);

const PostParams = vstruct([
  { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  { name: 'keys', type: vstruct.VarArray(vstruct.UInt8, vstruct.Buffer(42)) },
]);

const PlainTextContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
  { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

const UpdateAccountParams = vstruct([
  { name: 'key', type: vstruct.VarString(vstruct.UInt8) },
  { name: 'value', type: vstruct.VarBuffer(vstruct.UInt16BE) },
]);
const Followings = vstruct([
  { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);
const InteractParams = vstruct([
  { name: 'object', type: vstruct.Buffer(32) },
  { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
]);

const Content = vstruct([
  { name: 'type', type: vstruct.UInt8 },
])

const ReactContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
  { name: 'reaction', type: vstruct.UInt8 },
]);
function encode(tx) {
  let params, operation;
  if (tx.version !== 1) {
    throw Error('Wrong version');
  }
  switch (tx.operation) {
    case 'create_account':
      params = CreateAccountParams.encode({
        ...tx.params,
        address: base32.decode(tx.params.address),
      });
      operation = 1;
      break;

    case 'payment':
      params = PaymentParams.encode({
        ...tx.params,
        address: base32.decode(tx.params.address),
      });
      operation = 2;
      break;

    case 'post':
      if (tx.params.content.type === 1) {
        tx.params.content = PlainTextContent.encode(tx.params.content);

      }
      params = PostParams.encode(tx.params);
      operation = 3;
      break;

    case 'update_account':

      if (tx.params.key === 'name') {
        tx.params.value = Buffer.from(tx.params.value, 'utf-8');
      }
      if (tx.params.key === 'avatar') {
        tx.params.value = Buffer.from(tx.params.value, 'base64');
      }
      if (tx.params.key === 'followings') {
        if (!Buffer.isBuffer(tx.params.value)) {
          let addresses = tx.params.value.addresses;
          tx.params.value.addresses = addresses.map(e => base32.decode(e));
          tx.params.value = Followings.encode(tx.params.value);
        }
      }
      params = UpdateAccountParams.encode(tx.params);

      operation = 4;
      break;
    case 'interact':
      if(tx.params.content.type === 1){
        tx.params.content = PlainTextContent.encode({type: 1, text: tx.params.data})
      }
      if(tx.params.content.type === 2){
        tx.params.content = ReactContent.encode({type: 2, reaction: tx.params.content.reaction})
      }
      params = InteractParams.encode({
        ...tx.params,
        object: Buffer.from(tx.params.object, 'hex'),
      });
      operation = 5;
      break;

    default:
      throw Error('Unspport operation');
  }
  return Transaction.encode({
    version: 1,
    account: base32.decode(tx.account),
    sequence: tx.sequence,
    memo: tx.memo,
    operation,
    params,
    signature: tx.signature,
  });
}

function decode(data) {
  const tx = Transaction.decode(data);
  if (tx.version !== 1) {
    throw Error('Wrong version');
  }
  let operation, params;
  switch (tx.operation) {
    case 1:
      operation = 'create_account';
      params = CreateAccountParams.decode(tx.params);
      params.address = base32.encode(params.address);
      Keypair.fromPublicKey(params.address);
      break;

    case 2:
      operation = 'payment';
      params = PaymentParams.decode(tx.params);
      params.address = base32.encode(params.address);
      Keypair.fromPublicKey(params.address);
      break;

    case 3:
      operation = 'post';
      params = PostParams.decode(tx.params);
      params.content = PlainTextContent.decode(params.content)
      break;

    case 4:
      operation = 'update_account';
      params = UpdateAccountParams.decode(tx.params);
      if (params.key === 'name') {
        params.value = params.value.toString('utf-8');
      }
      if (params.key === 'picture') {
        params.value = params.value.toString('base64');
      }
      if (params.key === 'followings') {
        let addresses = Followings.decode(params.value).addresses
        params.value = addresses.map(i => base32.encode(i))
      }
      break;
    case 5:
      operation = 'interact';
      params = InteractParams.decode(tx.params);
      params.object = params.object.toString('hex').toUpperCase();
      let content = Content.decode(params.content);
      if(content.type === 1){
        params.content = PlainTextContent.decode(params.content)
      }
      if(content.type === 2){
        params.content = ReactContent.decode(params.content)
      }
      break;
    default:
      throw Error('Unspport operation');
  }
  return {
    version: 1,
    account: base32.encode(tx.account),
    sequence: tx.sequence,
    memo: tx.memo,
    operation,
    params,
    signature: tx.signature,
  };
}

module.exports = { encode, decode };
