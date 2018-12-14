module.exports = function(address, tx){
  let post = {};
  post.Time = tx.Time
  if(tx.Operation === 'create_account'){
    if(tx.Params.address === address){
      post.Method = 'AccountWasCreatedBy';
      post.Content = tx.Address;
    }
    else {
      post.Method = 'CreateAccount';
      post.Content = tx.Address;
    }
  }
  if(tx.Operation === 'payment'){
    if(tx.Params.address === address){
      post.Method = 'ReceivePayment';
      post.Content = {
        From: tx.Address,
        Amount: tx.Params.amount
      }
    }
    else{
      post.Method = 'SendPayment'
      post.Content = {
        To: tx.Params.address,
        Amount: tx.Params.amount
      }
    }
  }
  return post;
}
