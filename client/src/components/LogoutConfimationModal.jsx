import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { LogOut } from "lucide-react";

export default function LogoutConfirmation({ isOpen, onClose, onLogout }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
      <p className="mb-6">Are you sure you want to logout? You'll need to login again to access your account.</p>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onLogout} className="hover:bg-red-600 bg-red-500" >Logout</Button>
      </div>
    </Modal>
  );
}
