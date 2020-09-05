import fetch from "../../lib/fetch";
import useSWR from "swr";
import withAuth from "../../components/with-auth";
import { useRouter } from "next/router";
import Loader from "../../components/loader";
import Page from "../../components/layout/page";
import PageHeader from "../../components/page-header";
import RecentTable from "../../components/tables/recent-table";
import Error from "../../components/error";

const Account = () => {
	const router = useRouter();
	const account = router.query.account;
	const { data, error } = useSWR(
		() => account && `/api/accounts/${account}`,
		fetch
	);

	if (error) return <Error />;

	return (
		<Page title={account}>
			<PageHeader text={account} />
			{data ? (
				data.message ? (
					JSON.stringify(data.message)
				) : (
					<RecentTable data={data.data} />
				)
			) : (
				<Loader />
			)}
		</Page>
	);
};

export default withAuth(Account);
