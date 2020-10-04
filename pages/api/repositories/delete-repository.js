import escape from 'sql-template-strings';

import {withTransactionWrapper, conn} from './transaction-wrapper-repository';

export const deleteTransaction = async row => {
	const {trn_id, amount, from_account, to_account} = row;

	await conn.query(escape`delete from transactions where trn_id = ${trn_id}`);
	await conn.query(
		escape`UPDATE transactions SET to_balance = to_balance - ${amount} WHERE trn_id > ${trn_id} AND (to_account = ${to_account} OR to_account = ${from_account})`
	);
	await conn.query(
		escape`UPDATE transactions SET from_balance = from_balance + ${amount} WHERE trn_id > ${trn_id} AND (from_account = ${to_account} OR from_account = ${from_account})`
	);

	return 'OK';
};

export const wrappedDeleteTransaction = async props =>
	withTransactionWrapper(deleteTransaction, props);
