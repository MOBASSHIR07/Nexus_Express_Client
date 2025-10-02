import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-toastify/dist/ReactToastify.css";
import { FaUserShield, FaUser } from "react-icons/fa";

const MakeAdmin = () => {
  const axiosSecure = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchEmail, setSearchEmail] = useState("");

  // 🔍 Search users by email
  const {
    data: users = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["searchUsers", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/nexus/api/users/search?email=${searchEmail}`);
      return res.data;
    },
    enabled: searchEmail.trim().length > 0,
  });

  // 🔁 Mutation: update user role
  const { mutateAsync: updateRole, isPending } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/nexus/api/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries(["searchUsers", searchEmail]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to update role", {
        position: "top-center",
      });
    },
  });

  // ⚡ Handle Role Toggle with SweetAlert confirmation
  const handleRoleToggle = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const title =
      user.role === "admin"
        ? `Remove admin access from ${user.email}?`
        : `Make ${user.email} an admin?`;

    const result = await Swal.fire({
      title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: user.role === "admin" ? "Yes, remove!" : "Yes, make admin!",
      cancelButtonText: "Cancel",
      confirmButtonColor: user.role === "admin" ? "#e53e3e" : "#38a169",
      cancelButtonColor: "#a0aec0",
    });

    if (result.isConfirmed) {
      await updateRole({ id: user._id, role: newRole });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Admin Access</h2>

      {/* 🔍 Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Search user by email..."
          className="input input-bordered w-full sm:flex-1"
        />
        <button
          onClick={() => queryClient.invalidateQueries(["searchUsers", searchEmail])}
          className="btn btn-primary w-full sm:w-auto"
          disabled={!searchEmail.trim()}
        >
          Search
        </button>
      </div>

      {/* 🧭 Result States */}
      {isFetching && (
        <p className="text-center text-sm text-gray-500">Searching users...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load users</p>
      )}

      {/* 📜 Results Table */}
      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <table className="table w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td className="text-center capitalize">{user.role}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleRoleToggle(user)}
                      disabled={isPending}
                      className={`btn btn-sm ${
                        user.role === "admin" ? "btn-error" : "btn-success"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <>
                          <FaUser className="mr-2" /> Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-2" /> Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searchEmail.trim().length > 0 &&
          !isFetching && (
            <p className="text-center text-gray-500 mt-4">
              No users found for "{searchEmail}"
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
