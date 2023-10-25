"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
    if (userName) {
      fetchPosts();
    }
    // console.log(posts)
  }, [userName]);


  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page`}
      data={userPosts}
   
    />
  );
};

export default UserProfile;
