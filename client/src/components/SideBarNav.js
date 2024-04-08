import React from "react";

function SideBarNav() {
  return (
    <aside id="sidebar">
      <div class="sidebar-title">
        <div class="sidebar-brand">MedFlow</div>

        <span class="material-symbols-outlined" onclick="closeSidebar()">
          close
        </span>
      </div>
      <ul class="sidebar-list">
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Staff
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Appointments
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Shift Scheduling
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Patients
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Laboratory Management
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Ward Management
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Inventories
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Finances
          </a>
        </li>
        <li class="sidebar-list-item">
          <a href="#" target="_blank">
            Manage Branches
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default SideBarNav;
