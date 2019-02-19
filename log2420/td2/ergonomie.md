1855719 – Felix-Antoine Bourbonnais
1860254 – Noboru Yoshida

Amélioration 1: (IMPLÉMENTÉE)
    Selon les Heuristiques de Tognazzini, un des principes important est les valeurs de defaut. À ce niveau, on considère les boutons de defaut. Le principe dit qu'il faudrait toujours remplacer le bouton "default" pour un bouton plus indicatif, comme "Restore Initial Settings", par exemple. Cela permet ainsi d'éviter une certaine incertitude/confusion pour les utilisateurs.

Amélioration 2:
    Selon Scapin et Bastien, un des principes important est la gestion des erreurs. Une façon efficace d'éviter des erreurs du client, dans notre cas, serait d'implémenter une fonctionnalité qui afficherait un message "d'erreur" en rouge en dessous des champs non-conformes. Cela permetterait d'indiquer à l'utilisateur de ne pas envoyer une requete de "calculate" tant qu'un champ est non-conforme (ex: utiliser des ".", et non des virgules pour indiquer les décimales, ou indiquer qu'un champ est vide).

Amélioration 3: (IMPLÉMENTÉE)
    Selon les Heuristiques de Tognazzini, il est important de considérer l'efficacité de l'usager et sa facilité à lire la page. Scapin et Bastien proposent comme principe le guidage. Tous ces principes peuvent exprimer l'amélioration suivante: il n'y a pas d'association évidente entre un "Species" et une "Mass". Ceci dit, on peut ajouter une boite entourant les deux champs, ce qui renforce l'idée que les deux champs sont liés ensemble. Dans la même idée, on change le bouton de place pour une position plus appropriée.