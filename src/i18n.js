import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      /* ===== MENU ===== */
      menuHome: "Dashboard",
      menuClients: "Clients",
      menuServices: "Services",
      menuFinance: "Finance",
      menuMaterials: "Materials",
      menuReminders: "Reminders",
      menuSettings: "Settings",
      menuLogout: "Logout",

      /* ===== DASHBOARD ===== */
      dashboardTitle: "Business Overview",
      totalRevenue: "Total Revenue",
      totalReceived: "Total Received",
      totalProfit: "Profit",
      todayTasks: "Today's Tasks",
      lowStock: "Low Stock Materials",
      advertisement: "Sponsored",

      /* ===== CLIENTS ===== */
      clientsTitle: "Clients",
      AddClient: "Add Client",
      Address: "Address",
      Phone: "Phone",
      Email: "Email",
      TotalCharged: "Total Charged",
      TotalReceived: "Total Received",
      Status: "Status",
      Pending: "Pending",
      Paid: "Paid",
      NeedsAttention: "Needs Attention",
      Premium: "Premium",
      Save: "Save",
      Delete: "Delete",
      Cancel: "Cancel",
      Back: "Back",

      /* ===== SERVICES ===== */
      servicesTitle: "Services",
      addService: "Add Service",
      addService: " + Add Service",
      saveService: "Save Service",
      serviceName: "Service Name",
      servicePrice: "Price",
      serviceDate: "Date",
      serviceStatus: "Status",
      serviceInProgress: "In Progress",
      serviceCompleted: "Completed",
      total: "Total",
      completed: "Completed",
      inProgress: "In Progress",
      pendingPayment: "Pending Payment",
      serviceLate: "Late",

      /* ===== FINANCE ===== */
      financeTitle: "Financial Control",
      monthlyRevenue: "Monthly Revenue",
      expenses: "Expenses",
      netProfit: "Net Profit",
      installment: "Installments",
      paid: "Paid",
      pending: "Pending",

      /* ===== MATERIALS ===== */
      materialsTitle: "Materials Control",
      addMaterial: "Add Material",
      materialName: "Material Name",
      materialQuantity: "Quantity",
      unitCost: "Unit Cost",
      materialMin: "Minimum Stock",

      /* ===== REMINDERS ===== */
      remindersTitle: "Reminders",
      addReminder: "Add Reminder",
      reminderPlaceholder: "Enter task...",

      /* ===== GENERIC ===== */
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      hide: "Hide",
      show: "Show"
    }
  },

  pt: {
    translation: {
      
    }
  },

  fr: {
    translation: {
      
    }
  },

  es: {
    translation: {
     
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
