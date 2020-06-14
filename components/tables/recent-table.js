import styled from "styled-components";
import Link from "next/link";

const StyledTable = styled.table`
	border: 1px solid #333;
	margin-bottom: 50px;

	th,
	td {
		padding: 5px;
		// border: 1px solid #333;
	}

	tr:nth-child(even) {
		background-color: white;
		color: #333;
	}

	.account-row {
		cursor: pointer;
	}

	.account {
		padding-left: 30px;
		padding-right: 10px;
	}

	.balance {
		padding-left: 30px;
		padding-right: 30px;
	}
`;

const RecentTable = ({ data }) => (
	<StyledTable>
		<tbody>
			<tr>
				<th>Account</th>
				<th>Balance</th>
			</tr>
			{Object.entries(data).map(([category, categoryValues], index) => (
				<Link key={index} href="#">
					<>
						<tr>
							<td>{category}</td>
							<td className="balance">{categoryValues.balance}</td>
						</tr>
						{Object.entries(categoryValues.accounts).map(
							([account, accountBalance], index) => (
								<tr key={index} className="account-row">
									<td className="account">{account}</td>
									<td className="balance">{accountBalance}</td>
								</tr>
							)
						)}
					</>
				</Link>
			))}
		</tbody>
	</StyledTable>
);

export default RecentTable;