import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransaction }) => {
  const categories = ['salary', 'project', 'stocks', 'bills', 'groceries', 'rent', 'taxes'];

  // total transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(txn => txn.type === 'income');
  const totalExpenseTransactions = allTransaction.filter(txn => txn.type === 'expense');
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

  // total turnover
  const totalTurnover = allTransaction.reduce((acc, txn) => acc + txn.amount, 0);
  const totalIncomeTurnover = allTransaction
    .filter(txn => txn.type === 'income')
    .reduce((acc, txn) => acc + txn.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter(txn => txn.type === 'expense')
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        {/* Total Transactions */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header">Total Transactions : {totalTransaction}</div>
            <div className="card-body">
              <h6 className="text-success">Income: {totalIncomeTransactions.length}</h6>
              <h6 className="text-danger">Expense: {totalExpenseTransactions.length}</h6>
              <div className="d-flex justify-content-around mt-3">
                <Progress type="circle" strokeColor="green" percent={totalIncomePercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" percent={totalExpensePercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>

        {/* Total TurnOver */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h6 className="text-success">Income: {totalIncomeTurnover}</h6>
              <h6 className="text-danger">Expense: {totalExpenseTurnover}</h6>
              <div className="d-flex justify-content-around mt-3">
                <Progress type="circle" strokeColor="green" percent={totalIncomeTurnoverPercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" percent={totalExpenseTurnoverPercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>

        {/* Categorywise Income */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Categorywise Income</div>
            <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {categories.map(category => {
                const amount = allTransaction
                  .filter(txn => txn.type === 'income' && txn.category === category)
                  .reduce((acc, txn) => acc + txn.amount, 0);
                return (
                  amount > 0 && (
                    <div key={category} className="mb-2">
                      <h6 className="text-capitalize mb-1">{category}</h6>
                      <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>

        {/* Categorywise Expense */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">Categorywise Expense</div>
            <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {categories.map(category => {
                const amount = allTransaction
                  .filter(txn => txn.type === 'expense' && txn.category === category)
                  .reduce((acc, txn) => acc + txn.amount, 0);
                return (
                  amount > 0 && (
                    <div key={category} className="mb-2">
                      <h6 className="text-capitalize mb-1">{category}</h6>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
