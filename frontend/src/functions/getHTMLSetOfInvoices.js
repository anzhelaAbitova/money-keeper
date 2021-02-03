import store from '@/store';

export default (invoice) => {
  const html = `<div class="col-md-9 invoice-preview">
      <div class="invoice-printable">
          <div class="header">
              <table class="company_details">
                  <tbody>
                      <tr>
                          <td width="100%" valign="top">
                              <h2 class="supplier">${store.getters['company/dataComapany'].companyName}</h2>
                              <address itemprop="address" itemscope="">
                                  <span itemprop="postalCode" id="zip_code">${store.getters['company/dataComapany'].address.zipCode}</span>,&nbsp;
                                  <span itemprop="addressLocality" id="city">${store.getters['company/dataComapany'].address.sity}</span>,&nbsp;
                                  <span itemprop="streetAddress" id="address">${store.getters['company/dataComapany'].address.streat}</span>
                              </address>
                              <p class="phone">
                                  Телефон: <span itemprop="telephone" id="phone">${store.getters['company/dataComapany'].address.phone}</span>
                              </p>
                          </td>
                          <td width="300" class="logo"></td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div id="payment">
              <h3>Образец заполнения платежного поручения</h3>
              <table>
                  <tbody>
                      <tr>
                          <td id="bank" colspan="4">
                              ${store.getters['company/dataComapany'].bank.name}
                          </td>
                          <td id="BIC_label">
                              БИК
                          </td>
                          <td id="BIC">
                              ${store.getters['company/dataComapany'].bank.bik}
                          </td>
                      </tr>
                      <tr>
                          <td id="bank_label" colspan="4">
                              Банк получателя
                          </td>
                          <td id="correspondent_account_label">
                              Счёт №
                          </td>
                          <td id="correspondent_account">
                              ${store.getters['company/dataComapany'].bank.kor}
                          </td>
                      </tr>
                      <tr>
                          <td id="ITN_label">ИНН</td>
                          <td id="ITN">${store.getters['company/dataComapany'].inn}</td>

                          <td id="OGRNIP_label" style="display:none;">
                              ОГРНИП
                          </td>
                          <td id="OGRNIP" style="display:none;">
                              8902734782389
                          </td>
                          <td id="TRRC_label" style="display:;">
                              КПП
                          </td>
                          <td id="TRRC" style="display:;">
                              ${store.getters['company/dataComapany'].kpp}
                          </td>
                          <td id="account_label" rowspan="3">Счёт №</td>
                          <td id="account" rowspan="3">${store.getters['company/dataComapany'].bank.account}</td>
                      </tr>
                      <tr>
                          <td colspan="4" id="company">
                              ${store.getters['company/dataComapany'].companyName}
                          </td>
                      </tr>
                      <tr>
                          <td colspan="4" id="company_label">
                              Компания
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div id="info">
              <h1>Счёт № ${invoice.number} от ${invoice.dateStart}</h1>
              <table>
                  <tbody>
                      <tr>
                          <td>Поставщик:</td>
                          <td class="value">${store.getters['company/dataComapany'].companyName}</td>
                      </tr>
                      <tr>
                          <td>Клиент:</td>
                          <td class="value">${invoice.client.name}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div id="order">
              <table>
                  <thead>
                      <tr>
                          <th class="number">№</th>
                          <th class="code">Код</th>
                          <th class="title">Заголовок</th>
                          <th class="price">Цена</th>
                          <th class="count">Кол-во</th>
                          <th class="vat">НДС</th>
                          <th class="total">Итог</th>
                      </tr>
                  </thead>
                  <tbody class="data">
                      <tr>
                          <td class="number">1</td>
                          <td>${invoice.jobs[0].service.articul}</td>
                          <td>${invoice.jobs[0].service.description}</td>
                          <td class="summ">${invoice.jobs[0].service.price}</td>
                          <td class="summ">${invoice.jobs[0].count}</td>
                          <td class="summ">20%</td>
                          <td class="summ">${invoice.price}</td>
                      </tr>
                      <tr>
                          <td class="number"></td>
                          <td></td>
                          <td></td>
                          <td class="summ"></td>
                          <td class="summ"></td>
                          <td class="summ"></td>
                          <td class="summ"></td>
                      </tr>
                  </tbody>
                  <tbody class="total">
                      <tr>
                          <th class="filler" colspan="3"></th>
                          <th colspan="3">
                              Включая НДС:
                          </th>
                          <td class="summ">${invoice.price}</td>
                      </tr>
                      <tr>
                          <th class="filler" colspan="3"></th>
                          <th colspan="3">
                              Итого:
                          </th>
                          <td class="summ">${invoice.price}</td>
                      </tr>
                  </tbody>
              </table>
              <div id="total_text">
                  Итоговая сумма: ${invoice.price} рублей
              </div>
          </div>
          <div id="sign">
              <table>
                  <tbody>
                      <tr class="values">
                          <td id="director_post">${store.getters['company/dataComapany'].menegment.bossPosition}</td>
                          <td id="director_signature">
                          </td>
                          <td id="director">
                              ${store.getters['company/dataComapany'].menegment.bossName}
                          </td>
                      </tr>
                      <tr class="labels">
                          <td id="director_post_label">Должность</td>
                          <td id="director_signature_label">Подпись</td>
                          <td id="director_label">ФИО</td>
                      </tr>
                      <tr class="values accountant_info">
                          <td id="accountant_post">${store.getters['company/dataComapany'].menegment.buhPosition}</td>
                          <td id="accountant_sign">
                          </td>
                          <td id="accountant">
                              ${store.getters['company/dataComapany'].menegment.buhName}
                          </td>
                      </tr>
                      <tr class="labels accountant_info">
                          <td id="accountant_post_label">Должность</td>
                          <td id="accountant_signature_label">Подпись</td>
                          <td id="accountant_label">ФИО</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>`;
  return html;
};
