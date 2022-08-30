import { createClient } from '@supabase/supabase-js';

type userType = {
	username: string;
	id: string;
	discriminator: Number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient;

const addUserToDB = async (user: userType) => {
	await supabaseClient.from(`users`).insert([{ ...user }]);
};
export { addUserToDB };
