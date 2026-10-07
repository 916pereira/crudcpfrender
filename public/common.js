const campos = ['cpf','nome','sobrenome','email','idade','telefone','rua','bairro','cidade','estado','rg'];
const nomes = ['CPF','Nome','Sobrenome','E-mail','Idade','Telefone','Rua','Bairro','Cidade','Estado','RG'];
const normalizarCPF = value => value.replace(/\D/g, '');
function mensagem(texto, erro=false) { const el=document.querySelector('#mensagem'); el.textContent=texto; el.className=erro?'error':'success'; }
async function api(url, method='GET', data) {
 const res = await fetch(url, {method, headers:{'Content-Type':'application/json'}, ...(data?{body:JSON.stringify(data)}:{})});
 const body = await res.json();
 if (!res.ok) throw new Error(body.error || 'Não foi possível concluir a operação.');
 return body;
}
function dadosFormulario(form) { const data=Object.fromEntries(new FormData(form)); data.cpf=normalizarCPF(data.cpf); data.idade=Number(data.idade); data.estado=data.estado.toUpperCase(); return data; }
async function buscarCPF(cpf) {
 cpf=normalizarCPF(cpf);
 if (cpf.length!==11) throw new Error('Digite um CPF com 11 dígitos.');
 const registros=await api('/pessoas?cpf='+encodeURIComponent(cpf));
 if (!registros.length) throw new Error('Nenhuma pessoa encontrada com esse CPF.');
 return registros[0];
}
function detalhes(pessoa, alvo) {
 alvo.replaceChildren(); const dl=document.createElement('dl'); dl.className='panel';
 campos.forEach((campo,i)=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=nomes[i];dd.textContent=pessoa[campo];dl.append(dt,dd);});alvo.append(dl);
}
