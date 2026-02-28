export const customers = [
  {
    id: 1,
    name: "João Silva",
    phone: "416-000-0000",
    address: "Toronto",
    status: "active",
    notes: "Cliente recorrente"
  },
  {
    id: 2,
    name: "Maria Souza",
    phone: "416-111-1111",
    address: "Mississauga",
    status: "debt",
    notes: "Deve última parcela"
  }
];

export const services = [
  {
    id: 1,
    customerId: 1,
    date: "2026-02-01",
    description: "Instalação elétrica",
    serviceValue: 800,
    materialCost: 200,
    paymentType: "installment",
    installments: 2,
    paidInstallments: 1,
    status: "partial"
  },
  {
    id: 2,
    customerId: 2,
    date: "2026-02-05",
    description: "Reforma banheiro",
    serviceValue: 1500,
    materialCost: 500,
    paymentType: "cash",
    installments: 1,
    paidInstallments: 0,
    status: "open"
  }
];
