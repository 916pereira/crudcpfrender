function tabela(pessoas){
 const alvo=document.querySelector('#resultado');alvo.replaceChildren();document.querySelector('#total').textContent=`${pessoas.length} registro(s)`;
 if(!pessoas.length){alvo.textContent='Nenhum cadastro encontrado.';return;}
 const wrap=document.createElement('div');wrap.className='table-wrap';const t=document.createElement('table');const head=document.createElement('thead'),tr=document.createElement('tr');
 ['ID',...nomes,'Ações'].forEach(n=>{const th=document.createElement('th');th.textContent=n;tr.append(th);});head.append(tr);t.append(head);
 const body=document.createElement('tbody');pessoas.forEach(p=>{const row=document.createElement('tr');['id',...campos].forEach(f=>{const td=document.createElement('td');td.textContent=p[f];row.append(td);});const actions=document.createElement('td');['put','delete'].forEach((op,i)=>{const a=document.createElement('a');a.href=`/${op}/?cpf=${encodeURIComponent(p.cpf)}`;a.textContent=i?'Excluir':'Editar';actions.append(a);});row.append(actions);body.append(row);});t.append(body);wrap.append(t);alvo.append(wrap);
}
async function listar(){try{tabela(await api('/pessoas'));mensagem('');}catch(err){mensagem(err.message,true);}}
document.querySelector('#busca').addEventListener('submit',async e=>{e.preventDefault();try{tabela([await buscarCPF(document.querySelector('#cpfBusca').value)]);mensagem('');}catch(err){tabela([]);mensagem(err.message,true);}});
document.querySelector('#todos').addEventListener('click',listar);listar();
