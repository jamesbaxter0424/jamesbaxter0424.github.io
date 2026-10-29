/* Single source of truth for every project shown on index.html and work.html.
   Images live in the original site's assets folder (one level up).
   draft:true = no content/assets yet; hidden from all listings until the flag is removed. */
(function(){
  "use strict";
  var IMG='assets/img/';
  var P={
    agentic:{href:'agentic-ai.html',img:'@LLM-Mediated/cover.jpg',title:'LLM-Mediated Tool-Making in Visual Programming',pub:'ACADIA 2026 · Field Note',paper:'',desc:'An agentic AI assistant that builds and edits Grasshopper definitions.',tags:['Agentic AI','Grasshopper']},
    physical:{href:'physical-agent.html',img:'@Physical-Agent/cover.jpg',title:'Peter Pan, Where Is the Shadow Going?',pub:'CHI 2027 · Under Review',paper:'',desc:'An AI agent that senses and acts in physical space.',tags:['Physical Agent','AI Application']},
    carbon:{href:'carbon-calculator.html',img:'Building Embodied Carbon/embodied carbon calculator_cover.gif',title:'Embodied Carbon Calculator',desc:'A sustainability evaluation tool for low-carbon building design.',tags:['Tool Development','UI/UX Design']},
    sensor:{href:'sdg-campus.html',img:'Campus_Project/Campus_cover.gif',title:'Streamlining Digital Twin Deployment',pub:'ICCBEI 2025 · Full Paper',paper:'https://iccbei2025.hkust.edu.hk/ICCBEI_2025%20Proceedings.pdf',desc:'A data visualization platform for digital twin integration.',tags:['Web Development','Data Visualization']},
    crowd:{href:'crowd-simulation.html',img:'Crowd Simulation/Crowd-cover.gif',title:'Don’t Block My Way to Get a Job',desc:'An intelligent layout assessment for career fairs.',tags:['Crowd Simulation','Machine Learning']},
    interlace:{href:'interlace-forest.html',img:'Digital Fabrication/Ending Picture.jpg',title:'Interlace Forest',desc:'Digital tectonics forestation through human–robot collaboration.',tags:['Robotic Fabrication','Parametric Design']},
    scripting:{href:'parametric-design.html',img:'scripting/Scripting-Cover.gif',title:'Scripting and Parametric Design',desc:'Computational geometry and generative algorithms practice.',tags:['Rule-Based Design','Generative Algorithms']},
    water:{href:'graduate-design.html',img:'Graduate Project/Graduate Project Website-cover.jpg',title:'The Place Where Water Leaves',pub:'Graduate Thesis Prize',paper:'',desc:'Revealing the land texture of urban borders.',tags:['Urban Design','Architectural Design']},
    daily:{href:'daily-recording.html',img:'Daily Recording/Cover Photo.gif',title:'Daily Recording',desc:'Evaluating early-stage design decisions through material and energy insights.',tags:['Solar Simulation','Parametric Strategy']},
    bbq:{href:'bbq.html',img:'BBQ/BBQ Website-01.jpg',title:'BBQ, Boundless Book Quill',desc:'An educational platform for collaborative picture-book creation.',tags:['Web Development','UX/UI Design']},
    cocreate:{href:'co-creation.html',img:'Co-creation/Co-create_cover.gif',title:'Gestural Co-Creation with AI',desc:'A gesture-centered workflow for human–AI co-creation.',tags:['HCI','Design Tools']},
    dl:{href:'hybrid-graph-floorplans.html',img:'@Floorplan/model-architectures.png',title:'Hybrid Graph Reasoning for Floorplans',desc:'Graph-conditioned floor plan generation on ResPlan, extending House-GAN++ with GraphGPS-style local–global attention.',tags:['Deep Learning','Graph Neural Networks']},
    ids:{href:'us-realestate-insight.html',img:'@US-RealEstate/cover.png',title:'US-RealEstate Insight',desc:'A Streamlit dashboard for multi-dimensional valuation and investment decision support in U.S. real estate.',tags:['Data Visualization','Machine Learning']}
  };
  /* category -> project ids, in display order */
  var CATS={
    selected:['agentic','physical','crowd','carbon','sensor'],
    spatial:['crowd','interlace','scripting','water','daily'],
    software:['sensor','carbon','bbq'],
    ai:['agentic','physical','cocreate','dl','ids']
  };
  /* order used by work.html (all published projects) */
  var ALL=['agentic','physical','cocreate','dl','ids','crowd','interlace','daily','carbon','sensor','bbq','scripting','water'];

  function resolve(id){
    var p=P[id];
    if(!p||p.draft)return null;
    var o={};for(var k in p)o[k]=p[k];
    o.img=p.img.charAt(0)==='@'?'assets/img/'+p.img.slice(1):IMG+p.img;
    return o;
  }
  function list(ids){return ids.map(resolve).filter(Boolean)}

  window.PROJECTS={
    category:function(name){return list(CATS[name]||[])},
    all:function(){return list(ALL)}
  };
})();
