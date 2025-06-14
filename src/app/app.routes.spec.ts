import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContainerComponent } from './presentation/layout/container/container.component';
import { Location } from '@angular/common';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ContainerComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should have a default route that loads ContainerComponent', () => {
    const defaultRoute = routes.find(route => route.path === '');
    expect(defaultRoute).toBeTruthy();
    expect(defaultRoute?.component).toBe(ContainerComponent);
  });

  it('should have a child route that lazy loads HomeComponent', () => {
    const defaultRoute = routes.find(route => route.path === '');
    const childRoute = defaultRoute?.children?.[0];
    expect(childRoute).toBeTruthy();
    expect(childRoute?.path).toBe('');
    expect(typeof childRoute?.loadComponent).toBe('function');
  });

  it('should have a wildcard route that redirects to default route', () => {
    const wildcardRoute = routes.find(route => route.path === '**');
    expect(wildcardRoute).toBeTruthy();
    expect(wildcardRoute?.redirectTo).toBe('');
  });

  it('should navigate to default route when accessing unknown path', async () => {
    await router.navigate(['/unknown-path']);
    expect(location.path()).toBe('/');
  });

  it('should have exactly 2 routes (default and wildcard)', () => {
    expect(routes.length).toBe(2);
  });
}); 