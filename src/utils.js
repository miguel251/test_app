import _ from 'lodash';

export const topTenElement = (topten = [], withdraw = [], deposit = []) => {
    let data = [];

    if(topten.length === 0 ||deposit.length === 0 || withdraw.length === 0) return;

    for (const id in topten) {

        data[topten[id]] = withdraw[topten[id]] ? {...withdraw[topten[id]], type_transaction: 'withdraw'} : {...deposit[topten[id]], type_transaction: 'deposit'};
    }

    return data;
    
}