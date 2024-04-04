import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home()
{
  const{data:session}= useSession();
  return <Layout>
    <div className="text-green-1000">
      Hello,<b>{session?.user?.name}</b>
    
    </div>

  </Layout>
}