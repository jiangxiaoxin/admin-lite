export function joinPath(parent: string, self: string) {
  if (self.startsWith("/")) {
    return parent + self;
  }
  return parent + "/" + self;
}
