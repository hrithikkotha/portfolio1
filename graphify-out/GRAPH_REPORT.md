# Graph Report - .  (2026-05-03)

## Corpus Check
- 35 files · ~320,534 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 39 nodes · 47 edges · 12 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `Hrithik Kotha` - 15 edges
2. `FIT FORGE` - 6 edges
3. `RENTSY (Airbnb Clone)` - 6 edges
4. `SPOTIFY CLONE` - 5 edges
5. `HTML5` - 5 edges
6. `Flipcart-Clone WEBPAGE` - 4 edges
7. `EdTech WEBPAGE` - 4 edges
8. `CSS3` - 4 edges
9. `React` - 4 edges
10. `Node.js` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Hrithik Kotha` --implements--> `FIT FORGE`  [EXTRACTED]
  README.md → docs/assets/fitforge.jpg
- `Hrithik Kotha` --implements--> `RENTSY (Airbnb Clone)`  [EXTRACTED]
  README.md → docs/assets/rentsy.png
- `Hrithik Kotha` --implements--> `TASK MANAGER`  [EXTRACTED]
  README.md → docs/assets/TaskManager.png
- `Hrithik Kotha` --implements--> `SPOTIFY CLONE`  [EXTRACTED]
  README.md → docs/assets/spotigy.webp
- `Hrithik Kotha` --implements--> `Flipcart-Clone WEBPAGE`  [EXTRACTED]
  README.md → docs/assets/flipkartimg.webp

## Hyperedges (group relationships)
- **Frontend Technologies** — skill_html5, skill_css3, skill_javascript, skill_react, skill_bootstrap, skill_tailwind [INFERRED 0.95]
- **Backend Technologies** — skill_nodejs, skill_express, skill_mongodb [INFERRED 0.95]
- **MERN Stack Projects** — project_fitforge, project_rentsy [EXTRACTED 0.95]
- **Programming Languages** — skill_cplusplus, skill_java, skill_javascript [INFERRED 0.95]
- **Version Control Tools** — skill_git, skill_github [INFERRED 0.90]
- **CSS Framework & UI Libraries** — skill_bootstrap, skill_tailwind [INFERRED 0.90]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.2
Nodes (10): GitHub Profile, Email: hrithikkotha@gmail.com, Instagram, LinkedIn, Phone: +91 8919818056, Data Structures and Algorithms (DSA), MERN Stack Development, Hrithik Kotha (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (2): loopGreetings(), typeGreeting()

### Community 2 - "Community 2"
Cohesion: 0.73
Nodes (6): FIT FORGE, RENTSY (Airbnb Clone), Express, MongoDB, Node.js, React

### Community 3 - "Community 3"
Cohesion: 0.9
Nodes (5): EdTech WEBPAGE, Flipcart-Clone WEBPAGE, SPOTIFY CLONE, CSS3, HTML5

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (2): TASK MANAGER, JavaScript

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (1): GitHub

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (1): Git

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (1): Bootstrap

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (1): Tailwind CSS

## Knowledge Gaps
- **13 isolated node(s):** `C++`, `Java`, `GitHub`, `Git`, `Bootstrap` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 4`** (2 nodes): `TASK MANAGER`, `JavaScript`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `server.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (1 nodes): `Message.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (1 nodes): `messages.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (1 nodes): `GitHub`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `Git`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `Bootstrap`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `Tailwind CSS`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hrithik Kotha` connect `Community 0` to `Community 2`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.270) - this node is a cross-community bridge._
- **Why does `FIT FORGE` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `RENTSY (Airbnb Clone)` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `SPOTIFY CLONE` (e.g. with `Flipcart-Clone WEBPAGE` and `EdTech WEBPAGE`) actually correct?**
  _`SPOTIFY CLONE` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `C++`, `Java`, `GitHub` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._