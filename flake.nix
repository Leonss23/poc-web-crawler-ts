{
  description = "HTTP web crawler written in TypeScript";

  outputs = { self, nixpkgs }: 
  let
    system = "x86_64-linux"; 
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_20
        corepack_21
        bun
      ];
    };
  };
}
