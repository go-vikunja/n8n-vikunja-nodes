{
  description = "dev environment";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { system = system; config.allowUnfree = true; };
      in {
        defaultPackage = pkgs.mkShell {
          buildInputs = with pkgs; [
          	nodejs_22
          	n8n
          ];
        };
      });
}
